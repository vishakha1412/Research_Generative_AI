import ResearchForm from "./components/ResearchForm";
import ResearchResult from "./components/ResearchResult";
import { useResearch } from "./hooks/useResearch";

export default function App() {
  const { loading, result, runResearch } = useResearch();

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-amber-100 via-amber-100 to-amber-200">
      <div className="max-w-3xl w-full mx-auto p-8  shadow-xl rounded-xl">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800 tracking-tight">
          Multi‑Agent Research Project
        </h1>

        <ResearchForm onSubmit={runResearch} />

        {loading && (
          <div className="mt-6 flex items-center justify-center">
            <span className="animate-spin h-5 w-5 mr-2 border-2 border-blue-600 border-t-transparent rounded-full"></span>
            <p className="text-blue-600 font-medium">Running pipeline...</p>
          </div>
        )}

        <div className="mt-8">
          <ResearchResult result={result} />
        </div>
      </div>
    </div>
  );
}
