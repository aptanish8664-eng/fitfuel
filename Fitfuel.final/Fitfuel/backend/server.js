require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  console.log("✅ /chat HIT:", req.body);

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.json({ reply: "OpenAI API key missing." });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are Justin Case AI for Fitfuel. Be concise and helpful."
        },
        {
          role: "user",
          content: req.body.text
        }
      ]
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error("❌ OPENAI ERROR:", err.message);
    res.status(500).json({ reply: "OpenAI request failed." });
  }
});

app.listen(3000, () => {
  console.log("✅ Backend running on http://localhost:3000");
});
