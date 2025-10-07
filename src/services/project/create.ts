import { api } from "../../api/api";

type Props = {
    name: string;
    type: string;
    id?: any;
    shapes?: any[];
};

export const createProject = async ({ name, type, id, shapes = [] }: Props) => {
    try {
        const res = await api.post("/create", {
            name,
            type,
            userId: id,
            shapes,
        });

        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || "Failed to create project");
    }
};
