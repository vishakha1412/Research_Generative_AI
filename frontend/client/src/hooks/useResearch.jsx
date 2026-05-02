import { useState } from "react";

export function useResearch() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const runResearch = async (topic) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, runResearch };
}
