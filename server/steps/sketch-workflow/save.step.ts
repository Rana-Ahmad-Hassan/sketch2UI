import { Handlers, ApiRouteConfig } from "motia";
import { z } from "zod";
import { Project } from "../../models/project";
import { connectDb } from "../../config/db";


export const config: ApiRouteConfig = {
    type: "api",
    name: "save",
    method: "POST",
    path: "/save",
    emits: []
};

export const handler = async (req: any) => {
    await connectDb()
    const body = req.body;

    let project = await Project.findById(body.projectId);

    if (!project) {
        return {
            status: 404,
            body: { error: "Project not found" },
        };
    }

    if (!project.shapes || project.shapes.length === 0) {
        project.shapes = body.shapes;
    } else {
        project.shapes = body.shapes;
    }

    await project.save();

    return {
        status: 200,
        body: "Project is saved successfully",
    };
};
