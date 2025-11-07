import {} from 'react'

const InputSection = ({text, setText, onSummarize, loading }) => {
  
  const handleClick = () => {
    if (text.trim()) onSummarize(text);
  };
  return (
    <div className="space-y-4">
      <textarea
        className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Paste your blog or article here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition disabled:opacity-50"
      >
        {loading ? "Summarizing..." : "Generate Summary"}
      </button>
    </div>
  )
}

export default InputSection