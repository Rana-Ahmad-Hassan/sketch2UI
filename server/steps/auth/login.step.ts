import { ApiRouteConfig, Handlers } from "motia";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/user";
import { connectDb } from "../../config/db";

export const config: ApiRouteConfig = {
    type: "api",
    name: "login-user",
    path: "/login",
    method: "POST",
    bodySchema: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
    emits: []
};

export const handler = async (req: any) => {
    await connectDb()
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return { status: 401, body: { message: "Invalid credentials" } };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return { status: 401, body: { message: "Invalid credentials" } };
    }

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || "secret123",
        { expiresIn: "1h" }
    );

    return {status: 200, body: { message: "Login successful", token, id: user._id } };
}
