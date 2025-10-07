import { ApiRouteConfig } from "motia";
import { z } from "zod";
import { Project } from "../../models/project";
import { connectDb } from "../../config/db";

export const config: ApiRouteConfig = {
    type: "api",
    name: "create-project",
    path: "/create",
    method: "POST",
    bodySchema: z.object({
        userId: z.string().optional(),
        name: z.string().min(1, "Project name is required"),
        type: z.string().min(1, "Project type is required"),
        shapes: z.array(z.any()).optional(),
    }),
    emits: []

};

export const handler = async ({ body }: { body: any }) => {
    await connectDb();
    try {
        const { userId, name, type, shapes } = body;

        const project = new Project({
            userId,
            name,
            type,
            shapes: shapes || [],
        });

        await project.save();

        return {
            status: 201,
            body: {
                message: "Project created successfully",
                project: {
                    ...project.toObject(),
                    id: project._id,
                },
            },
        };
    } catch (error: any) {
        return {
            status: 500,
            body: {
                message: "Failed to create project",
                error: error.message,
            },
        };
    }
};
