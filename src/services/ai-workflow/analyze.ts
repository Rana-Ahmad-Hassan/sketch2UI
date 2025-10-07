import { api } from "../../api/api";


export const analyzeWireFrames = async (shapes: any, projectId: any, userId: any) => {
    try {
        const res = await api.post("/analyze", {
            shapes,
            projectId,
            userId
        })
        return res.data
    } catch (error: any) {
        throw new Error(error)
    }
}