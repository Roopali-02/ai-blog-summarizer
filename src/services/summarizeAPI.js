import axios from "axios";

const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
const API_TOKEN = import.meta.env.VITE_HF_API_KEY;

export const testSummarizerAPI = async () => {
  try {
    const res = await axios.post(
      API_URL,
      { inputs: "Artificial intelligence is transforming the world by automating tasks and enhancing decision-making." },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest"
        },
      }
    );
    console.log("✅ API Response:", res.data);
  } catch (err) {
    console.error("❌ API Error:", err.response?.data || err.message);
  }
};