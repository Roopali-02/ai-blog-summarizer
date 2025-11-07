import { useState,useEffect  } from 'react'
import axios from "axios";
import InputSection from "./components/InputSection";
import OutputSection from "./components/OutputSection";
import HistorySection from "./components/HistorySection";
import './App.css'

function App() {
   const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const API_URL ="/api/summarize.js";
  const API_TOKEN = import.meta.env.VITE_HF_API_KEY;

   useEffect(() => {
    const saved = localStorage.getItem("summaryHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Save to localStorage whenever history changes
  useEffect(() => {
     if (history.length > 0) {
    // ensure data isn’t empty before saving
    localStorage.setItem("summaryHistory", JSON.stringify(history));
  }
  }, [history]);


  const summarizeText = async (text) => {

    const response = await axios.post(
      API_URL,
       {
      inputs: text,
      parameters: {
        max_length: 120,
        min_length: 30,
        do_sample: false,
      },
      options: { wait_for_model: true },
     },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
        },
      }
    );

    return response.data;
  };

  const handleSummarize = async (text) => {
   setLoading(true);
    setError("");
    setSummary("");

    try {
      const res = await summarizeText(text);
      const finalSummary = res[0]?.summary_text || "No summary returned.";
      setSummary(finalSummary);

      // ✅ Save to history
     const newItem = { text, summary: finalSummary, time: Date.now() };
setHistory((prev) => {
  const updated = [newItem, ...prev].slice(0, 6);
  localStorage.setItem("summaryHistory", JSON.stringify(updated));
  return updated;
});
    } catch (err) {
      console.error(err);
      setError("Failed to summarize. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSummary("");
    setError("");
    setText(""); 
  };
  
   const handleSelectHistory = (item) => {
    setText(item.text); 
    setSummary(item.summary);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
   
     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          🧠 AI Blog Summarizer
        </h1>

        <InputSection onSummarize={handleSummarize} loading={loading}  text={text}
          setText={setText}/>
        <OutputSection summary={summary} error={error} onClear={handleClear} />
        <HistorySection history={history} onSelect={handleSelectHistory} />
      </div>
    </div>
  )
}

export default App
