import { api } from "../../api/api";


export const saveWireFrames = async (shapes: any, projectId: any, userId: any) => {
    try {
        const res = await api.post("/save", {
            shapes,
            projectId,
            userId
        })
        return res.data
    } catch (error: any) {
        throw new Error(error)
    }
}