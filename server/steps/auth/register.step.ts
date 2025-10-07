import { ApiRouteConfig, Handlers } from "motia";
import { z } from "zod";
import bcrypt from "bcrypt";
import { User } from "../../models/user";
import { connectDb } from "../../config/db";

export const config: ApiRouteConfig = {
    type: "api",
    name: "register-user",
    path: "/register",
    method: "POST",
    bodySchema: z.object({
        email: z.string().email(),
        password: z.string().min(6),
    }),
    emits: []
};

export const handler = async (req: any) => {
    await connectDb()
    const { email, password } = req.body;

    // check existing
    const existing = await User.findOne({ email });
    if (existing) {
        return { status: 400, body: { message: "User already exists" } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    return {status: 200, body: { message: "User registered successfully" } };
}

