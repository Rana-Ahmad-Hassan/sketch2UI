import { api } from "../../api/api";


type Props = {
    email: string,
    password: string
}
export const registerUser = async ({ email, password }: Props) => {
    try {
        const res = await api.post("/register", {
            email,
            password
        })
        return res.data
    } catch (error: any) {
        throw new Error(error)
    }
}

