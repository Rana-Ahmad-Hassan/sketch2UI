import { ApiRouteConfig, Handlers } from "motia";
import { z } from "zod";
import { Project } from "../../models/project";
import { connectDb } from "../../config/db";

export const config: ApiRouteConfig = {
    type: "api",
    name: "get-projects",
    path: "/projects/:id",
    method: "GET",
    emits: []
};

export const handler = async (req: any) => {
    await connectDb();

    try {
        const id = req.pathParams.id;

        let projects;
        if (id) {
            projects = await Project.find({ userId: id }).sort({ createdAt: -1 });
        } else {
            projects = await Project.find().sort({ createdAt: -1 });
        }

        return {
            status: 200,
            body: {
                message: "Projects fetched successfully",
                projects,
            },
        };
    } catch (error: any) {
        return {
            status: 500,
            body: {
                message: "Failed to fetch projects",
                error: error.message,
            },
        };
    }
}

