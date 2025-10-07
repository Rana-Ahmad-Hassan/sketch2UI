import { api } from "../../api/api";


export const generateScreens = async (screens: any, palette: any, typography: any) => {
    try {
        const res = await api.post("/generate", {
            screens,
            palette,
            typography
        })
        return res.data
    } catch (error: any) {
        throw new Error(error)
    }
}