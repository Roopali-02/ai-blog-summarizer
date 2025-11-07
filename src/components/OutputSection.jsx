import {useState}  from 'react'

const OutputSection = ({ summary, error, onClear }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);

    // Hide "Copied!" after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 space-y-4">
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {summary && (
        <div className="bg-gray-100 p-4 rounded-lg relative">
          <h2 className="font-semibold mb-2">Summary:</h2>
          <p className="text-gray-700 whitespace-pre-line">{summary}</p>

          <div className="flex justify-end items-center mt-3 space-x-3 relative">
            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded-md"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>

            <button
              onClick={onClear}
              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm rounded-md"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default OutputSection