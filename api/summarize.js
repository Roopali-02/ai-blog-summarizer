import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const API_URL = "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn";
    const API_TOKEN = process.env.HF_API_KEY;

    const response = await axios.post(
      API_URL,
      { inputs: req.body.text },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    const summary =
    data[0]?.summary_text || data[0]?.generated_text || "No summary returned.";
    res.status(200).json({ summary });
  } catch (error) {
    console.error("Error from Hugging Face:", error.response?.data || error.message);
    res.status(500).json({ message: "Summarization failed" });
  }
}
