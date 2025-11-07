import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
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

    res.status(200).json({ summary: response.data[0].summary_text });
  } catch (error) {
    console.error("Error from Hugging Face:", error.response?.data || error.message);
    res.status(500).json({ message: "Summarization failed" });
  }
}
