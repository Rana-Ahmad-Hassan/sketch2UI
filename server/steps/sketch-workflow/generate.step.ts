import { Handlers, ApiRouteConfig } from "motia";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { z } from "zod";

const token = process.env.TOKEN!; // move to env
const endpoint = process.env.END_POINT!;
const model = process.env.MODEL!; // or gpt-5 for better gen

export const config: ApiRouteConfig = {
  type: "api",
  name: "generate",
  method: "POST",
  path: "/generate",
  emits: []
};

export const handler = async (req: any) => {
  const body = req.body;

  const client = ModelClient(endpoint, new AzureKeyCredential(token));

  const response = await client.path("/chat/completions").post({
    body: {
      model,
      messages: [
        // important: replace the system message content with the block below
        {
          role: "system",
          content: `You are a world-class frontend design genius (10+ years experience). 
Your job: turn screen definitions into **award-winning, modern, professional UI** with production-ready **HTML + Tailwind CSS**.

Rules:
- Always create layouts that feel like Stripe, Apple, or Dribbble showcases.
- Include: Professional designs, shadcn aesthitcs, sleek UI, animation but little using CSS, glassmorphism, hero sections, overlapping cards, hover effects, responsive grids, modals, navbars.
- Always apply "palette" colors to buttons, backgrounds, accents.
- Always apply "typography" fonts (Google Fonts <link> included).
- Use Unsplash images:
  <img src="https://source.unsplash.com/1200x800/?<keywords>" alt="..." />

Output format:
{
  "screens": [
    { "name": "...", "description": "...", "code": "<!DOCTYPE html>...</html>" }
  ]
}

⚡ Reference Style Example:
{
  "screens": [
    {
      "name": "Landing Page",
      "description": "Hero with gradient background, glassmorphic card, bold CTA",
      "code": "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width,initial-scale=1.0'><title>Landing</title><script src='https://cdn.tailwindcss.com'></script><link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap' rel='stylesheet'></head><body class='font-[Inter] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center'><div class='text-center text-white p-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl max-w-2xl'><h1 class='text-5xl font-extrabold mb-6'>Welcome to the Future</h1><p class='text-lg mb-6 opacity-90'>Build modern UIs faster with breathtaking design</p><img src='https://source.unsplash.com/1200x800/?technology,startup' class='rounded-xl mb-6'/><a href='#' class='bg-white text-purple-600 px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-purple-100 transition'>Get Started</a></div></body></html>"
    }
  ]
}

👉 Always design at this level of creativity or higher.
`
        }



        ,

        {
          role: "user",
          content: `Here is the screen analysis with style rules:\n${JSON.stringify(body, null, 2)}`

        },
      ],
    },
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

const result: string = response.body.choices[0].message.content || "";

// 🔹 Function to clean and extract JSON
function extractJSON(output: string): any {
  // Remove markdown fences
  const cleaned = output
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  // Regex: find the first {...} block
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error("No JSON object found in AI output");
  }

  try {
    return JSON.parse(match[0]);
  } catch (e) {
    console.error("JSON parse failed:", cleaned);
    throw new Error("Invalid JSON structure in AI output");
  }
}

let parsed;
try {
  parsed = extractJSON(result);

  // 🔹 Schema validation
  const ScreenSchema = z.object({
    name: z.string(),
    description: z.string(),
    code: z.string(),
  });

  const ScreensSchema = z.object({
    screens: z.array(ScreenSchema),
  });

  parsed = ScreensSchema.parse(parsed);

} catch (e) {
  console.error("Failed to parse AI output:", result);
  throw new Error("Invalid AI output");
}

return {
  status: 200,
  body: parsed,
};

};
