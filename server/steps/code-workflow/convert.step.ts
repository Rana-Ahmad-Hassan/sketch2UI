import { ApiRouteConfig } from "motia";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env.TOKEN!;
const endpoint = process.env.END_POINT!;
const model = process.env.MODEL!;

export const config: ApiRouteConfig = {
    type: "api",
    name: "convert-to-react",
    method: "POST",
    path: "/convert-to-react",
    emits: [],
};

export const handler = async (req: any) => {
    // ✅ Expect body to contain only { html: string }
    const { code: html } = req.body;
    if (!html || typeof html !== "string") {
        return {
            status: 400,
            body: { message: "Request body must include { html: string }" },
        };
    }

    const client = ModelClient(endpoint, new AzureKeyCredential(token));

    const response = await client.path("/chat/completions").post({
        body: {
            model,
            messages: [
                {
                    role: "system",
                    content: `You are an expert React + Tailwind developer.
Your task: convert given **HTML code** into **clean React functional component (JSX)**.

Rules:
- Wrap in a functional component: export default function Component() { return (...) }
- Use proper React JSX syntax: 
  - class → className
  - for → htmlFor
  - self-close <img />, <input />, <br />, etc.
- Keep all Tailwind classes intact.
- Ensure components are responsive and production-ready.
- Do not include <!DOCTYPE html>, <html>, <head>, or <body>.
- Return ONLY the valid React component code string, nothing else.
          `,
                },
                {
                    role: "user",
                    // ✅ Always send plain HTML
                    content: html,
                },
            ],
        },
    });

    if (isUnexpected(response)) {
        throw response.body.error;
    }

    const result: string = response.body.choices[0].message.content || "";

    // 🔹 Extract only valid React component code
    function extractReactCode(output: string): string {
        const cleaned = output
            .replace(/```tsx\s*/gi, "")
            .replace(/```jsx\s*/gi, "")
            .replace(/```javascript\s*/gi, "")
            .replace(/```js\s*/gi, "")
            .replace(/```/g, "")
            .trim();

        if (!cleaned.includes("export default function")) {
            throw new Error("Invalid AI output: missing React component");
        }

        return cleaned;
    }

    let parsedCode: string;
    try {
        parsedCode = extractReactCode(result);
    } catch (e) {
        console.error("Failed to extract React code:", result);
        throw new Error("Invalid AI output: missing React component");
    }

    return {
        status: 200,
        body: { code: parsedCode },
    };
};
