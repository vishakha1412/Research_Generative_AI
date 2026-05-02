import { useState } from "react";

export default function ResearchForm({ onSubmit }) {
  const [topic, setTopic] = useState("");

  return (
    <div className="mb-6 " >
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(topic);
      }}
      className="flex gap-3 items-center bg-white shadow-md rounded-lg p-3"
    >
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter research topic..."
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow hover:from-blue-700 hover:to-blue-800 transition-transform transform hover:scale-105"
      >
        Run 🚀
      </button>
    </form>
    <p className="mt-2 text-sm text-gray-500">
      Enter a research topic and click "Run 🚀" to start the research process.
    </p>
    </div>
  );
}
