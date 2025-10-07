import { api } from "../../api/api";



export const deleteProject = async (id: any) => {
    try {
        const res = await api.delete(`/delete/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error)
    }
}