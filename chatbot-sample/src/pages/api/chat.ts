// src/pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { runWorkflow } from "../../lib/agent";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const { input } = req.body;
    if (!input || typeof input !== "string") {
      res.status(400).json({ error: "Invalid input" });
      return;
    }
    const result = await runWorkflow({ input_as_text: input });
    res.status(200).json({ reply: result.output_text ?? "" });
  } catch (err: any) {
    console.error("chat api error:", err);
    res.status(500).json({ error: err?.message ?? "Server error" });
  }
}
