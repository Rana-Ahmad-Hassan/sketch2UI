import { api } from "../../api/api";


export const fetchProjects = async ({ id }: any) => {
    try {
        const res = await api.get(`/projects/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error)
    }
}