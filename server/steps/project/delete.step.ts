import { ApiRouteConfig } from "motia";
import { Project } from "../../models/project";
import { connectDb } from "../../config/db";

export const config: ApiRouteConfig = {
    type: "api",
    name: "delete-project",
    path: "/delete/:id",
    method: "DELETE",
    emits: [],
};

export const handler = async ({ req }: { req: any }) => {
    await connectDb();
    try {
        const id = req.pathParams.id;

        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return {
                status: 404,
                body: {
                    message: "No project found to delete",
                },
            };
        }

        return {
            status: 200,
            body: {
                message: "Project deleted successfully",
            },
        };
    } catch (error: any) {
        return {
            status: 500,
            body: {
                message: "Failed to delete project",
                error: error.message,
            },
        };
    }
};
