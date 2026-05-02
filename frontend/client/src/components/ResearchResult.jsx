import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ResearchResult({ result }) {
  if (!result) return null;

  return (
    <div className="mt-6 space-y-6">
      <section>
        <h2 className="font-bold text-lg">🔍 Search Results</h2>
        {Array.isArray(result.search_results) &&
          result.search_results.map((item, i) => {
            if (item.type === "text") {
              return (
                <div key={i} className="prose prose-sm text-gray-700">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={oneDark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className="bg-gray-200 px-1 rounded" {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {item.text}
                  </ReactMarkdown>
                </div>
              );
            }
            if (item.type === "reference") {
              return (
                <p key={i} className="text-sm text-blue-600">
                  References: {item.reference_ids.join(", ")}
                </p>
              );
            }
            return null;
          })}
      </section>

      <section>
        <h2 className="font-bold text-lg">📖 Scraped Content</h2>
        <div className="prose prose-sm text-gray-700">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.scraped_content || "No scraped content available."}</ReactMarkdown>
        </div>
      </section>

      <section>
        <h2 className="font-bold text-lg">📝 Report</h2>
        <div className="prose prose-sm text-gray-700">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.report}</ReactMarkdown>
        </div>
      </section>

      <section>
        <h2 className="font-bold text-lg">✅ Critic Feedback</h2>
        <div className="prose prose-sm text-gray-700">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.feedback}</ReactMarkdown>
        </div>
      </section>
    </div>
  );
}
