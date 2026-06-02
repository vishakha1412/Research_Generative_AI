import ResearchForm from "./components/ResearchForm";
import ResearchResult from "./components/ResearchResult";
import { useResearch } from "./hooks/useResearch";

export default function App() {
  const { loading, result, runResearch } = useResearch();

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-amber-100 via-amber-100 via-pink-100 to-amber-200">
      <div className=" w-full mx-auto p-8  shadow-xl rounded-xl">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800 tracking-tight font-serif text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent ">
          ResearchGuru: Your AI Research Assistant
        </h1>

        <ResearchForm onSubmit={runResearch} />

        {loading && (
          <div className="mt-6 flex items-center justify-center">
            <span className="animate-spin h-5 w-5 mr-2 border-2 border-blue-600 border-t-transparent rounded-full"></span>
            <p className="text-blue-600 font-medium ">Running pipeline...</p>
          </div>
        )}

        <div className="mt-8 bg-white shadow-md rounded-lg p-6 border border-gray-200   ">
          <ResearchResult result={result} />
        </div>
      </div>
    </div>
  );
}
