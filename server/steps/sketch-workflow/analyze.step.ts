import { Handlers, ApiRouteConfig } from "motia";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { z } from "zod";
import { Project } from "../../models/project";
import { connectDb } from "../../config/db";

const token = process.env.TOKEN!; // move to env
const endpoint = process.env.END_POINT!;
const model = process.env.MODEL!; // or gpt-5 for better gen

export const config: ApiRouteConfig = {
    type: "api",
    name: "analyze",
    method: "POST",
    path: "/analyze",
    emits: []
};

export const handler = async (req: any) => {
    await connectDb()
    const body = req.body;

    const client = ModelClient(endpoint, new AzureKeyCredential(token));

    const response = await client.path("/chat/completions").post({
        body: {
            model,
            messages: [
                {
                    role: "system",
                    content: `You are an AI specialized in analyzing wireframe sketches and turning them into structured screen definitions.

- Input: arbitrary wireframe drawings containing shapes, boxes, text, or layout hints.
- Task: Identify what screens the wireframe represents and describe them at a high level.
- Output: Return a valid JSON object with an array called "screens".
- Each screen must include:
  • name: a short descriptive title (e.g. "Login Screen", "Dashboard").
  • layout: a description of the general layout (e.g. "two-column form", "header with sidebar", "list with cards").
  • description: a human-readable summary of the screen's purpose.
  • elements: an array of key UI elements (e.g. { type: "input", label: "Email" }, { type: "button", label: "Submit" }).

Important rules:
- Do not return wireframe coordinates (x, y, width, height).
- Focus on the semantic meaning of the screens and their elements, not raw geometry.
- Only return valid JSON with no additional text or commentary.
`
                },

                {
                    role: "user",
                    content: `Here is the drawing data:\n${JSON.stringify(body.shapes, null, 2)}`,
                },
            ],
        },
    });

    let project = await Project.findById(body.projectId);

    if (!project) {
        return {
            status: 404,
            body: { error: "Project not found" },
        };
    }

        project.shapes = body.shapes;


    await project.save();

    if (isUnexpected(response)) {
        throw response.body.error;
    }

    const result = response.body.choices[0].message.content;

    return {
        status: 200,
        body: { analysis: result },
    };
};
