import { api } from "../../api/api";



export const convertToReact = async (code: any) => {
    try {
        const res = await api.post("/convert-to-react", {
            code
        })
        return res.data
    } catch (error: any) {
        throw new Error(error)
    }
}