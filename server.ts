import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Safe lazy initializer for Gemini API client
  let aiClient: GoogleGenAI | null = null;
  function getAiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        console.warn("WARNING: GEMINI_API_KEY is not set or is using placeholder.");
      }
      aiClient = new GoogleGenAI({
        apiKey: apiKey || "",
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // 1. API: Chat endpoint with Gemini API
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }

      const client = getAiClient();
      const userMessage = messages[messages.length - 1]?.content || "";

      const systemInstruction = `You are Peekaboo, the friendly virtual childcare assistant for Peekaboo Corner Regina Childcare Inc.
Your goal is to answer parents' questions warmly, reassuringly, and professionally.

Key Daycare Details:
- Name: Peekaboo Corner Regina Childcare Inc.
- Location: 4822 Queen Street, Regina, Saskatchewan, Canada (Treaty 4 territory).
- Hours: Monday to Friday, 7:30 AM to 5:30 PM.
- Licensing: Fully licensed early learning center in Saskatchewan.
- Parent Fee Grant: We are eligible for the Canada-Saskatchewan child care parent fee reduction grant. This reduces infant, toddler, and preschooler fees drastically so that parents pay a reduced monthly flat fee of only approximately $217.50 per month! This is supported by the federal-provincial childcare agreement.
- Age Groups Serviced:
  1. Infants (0 to 18 months) - focusing on secure bonds, safe exploration, and sensory play.
  2. Toddlers (18 to 36 months) - motor skill builders, social discovery, and vocabulary.
  3. Preschool & Kindergarten (3 to 5 years) - early math, pre-literacy, music, and nature projects.
  4. School Age (5 to 7 years) - homework support, structured sports, and leadership.
- Food & Nutrition: 100% healthy, freshly prepared vegetarian meals and snacks. Fully nut-free, supporting custom allergies and catering to multicultural/faith dietary requirements.
- Core Values: Play-based learning (hybrid Montessori & Reggio Emilia), safety, inclusive multicultural environment, community partnership, and an Indigenous learning commitment honoring Treaty 4 ancestors.
- Contact: Phone (306) 555-0198, email: hello@peekaboocorner.ca.

Actions parents can do on our website:
1. Book an in-person or virtual tour via the interactive booking calendar.
2. Register for waitlists and track status updates instantly via the waitlist builder.
3. Access the Parent Portal (credential hint to try: password is "parent" or custom login) to view daily activity logs, print tax receipts, or see meals.
4. Review children's milestones inside the Child Development Portfolio.

Be conversational, kind, clear, and informative. Frame suggestions positively. Keep answers concise (1-2 paragraphs max) and formatted in neat markdown.`;

      // Structure contents for generateContent. Include chat history formatted correctly
      const chatContents = messages.map((m: any) => {
        return {
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        };
      });

      // Call the correct SDK function
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: chatContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const responseText = response.text || "I'm happy to help you with booking a daycare tour, entering the waitlist, or answering questions about Peekaboo Corner! How can I support your family today?";

      return res.json({ response: responseText });
    } catch (e: any) {
      console.error("Gemini API Error:", e);
      return res.json({
        response: "Hello! I am having a tiny connection glitch, but I'm here to support you! For immediate bookings or admissions, please call us at (306) 555-0198, or write to our Regina admissions office at hello@peekaboocorner.ca. You can also book a tour or enroll in the waitlist directly using the buttons on this screen!"
      });
    }
  });

  // Mock enrollment storage & notifications for admin
  const simulatedSubmissions: any[] = [];
  app.post("/api/enrollment/submit", (req, res) => {
    const submission = req.body;
    submission.id = "REG-" + Math.floor(Math.random() * 900000 + 100000);
    submission.submissionDate = new Date().toISOString();
    submission.status = "Waitlisted";
    simulatedSubmissions.push(submission);
    return res.json({ success: true, submissionId: submission.id, status: submission.status });
  });

  // 2. Vite Integration Middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Peekaboo Server running on http://localhost:${PORT}`);
  });
}

startServer();
