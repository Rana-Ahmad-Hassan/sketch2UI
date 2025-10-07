import { api } from "../../api/api";


type Props = {
    email: string,
    password: string
}
export const loginUser = async ({ email, password }: Props) => {
    try {
        const res = await api.post("/login", {
            email,
            password
        })
        return res.data
    } catch (error: any) {
        throw new Error(error)
    }
}

