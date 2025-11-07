import React from 'react'

const HistorySection = ({ history, onSelect }) => {
  if (history.length === 0) return null;

  return (
     <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">Summary History</h2>
      <ul className="space-y-2 max-h-60 overflow-y-auto">
        {history.map((item, index) => (
          <li
            key={index}
            onClick={() => onSelect(item)}
            className="p-2 border rounded-lg cursor-pointer hover:bg-blue-50 transition"
          >
            <p className="text-sm text-gray-800 font-medium truncate">
              {item.text.slice(0, 70)}{item.text.length > 70 && "..."}
            </p>
            <p className="text-xs text-gray-500 truncate italic">
              {item.summary.slice(0, 100)}{item.summary.length > 100 && "..."}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HistorySection