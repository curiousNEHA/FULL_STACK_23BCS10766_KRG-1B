import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeResume = async (req, res) => {
  try {
    const { jobDesc } = req.body;
    const resumeFile = req.file;

    if (!resumeFile || !jobDesc) {
      return res.status(400).json({ message: "Missing resume or job description" });
    }

    // 1️⃣ Forward file and data to Flask microservice
    const formData = new FormData();
    formData.append("resume", fs.createReadStream(resumeFile.path));
    formData.append("jobDesc", jobDesc);

    const flaskResponse = await axios.post("http://127.0.0.1:7000/analyze", formData, {
      headers: formData.getHeaders(),
    });

    // 2️⃣ Cleanup uploaded file
    fs.unlinkSync(resumeFile.path);

    const { score, missing } = flaskResponse.data;

    // 3️⃣ Prepare AI prompt
    const prompt = `
      The resume analysis score is ${score}%. Missing keywords are: ${missing.join(", ")}.
      Suggest specific improvements like adding measurable results, improving clarity,
      and aligning skills with job requirements. Keep it concise, under 80 words, and friendly.
    `;

    // 4️⃣ Call Gemini Chat API (chat completions)
    const chatResponse = await genAI.chat.completions.create({
      model: "gemini-1.5-chat", // ✅ correct chat model
      messages: [{ role: "user", content: prompt }],
    });

    const aiSuggestion = chatResponse.choices[0].message.content;

    // 5️⃣ Send result to frontend
    res.json({
      atsScore: score,
      missingKeywords: missing,
      aiSuggestion,
    });

  } catch (error) {
    console.error("Error during analysis:", error);
    res.status(500).json({ message: "Error during resume analysis", error: error.message });
  }
};
