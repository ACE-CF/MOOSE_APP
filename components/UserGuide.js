import { useState, useEffect } from "react";

export default function UserGuide() {
  const [showGuide, setShowGuide] = useState(false);
   useEffect(() => {
    // 只在第一次访问时显示
    const hasSeenGuide = localStorage.getItem("hasSeenGuide");
    if (!hasSeenGuide) {
      setShowGuide(true);
      localStorage.setItem("hasSeenGuide", "true");
    }
  }, []);

  return (
    <>
      {showGuide && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl w-[650px] max-h-[80vh] overflow-y-auto relative p-8">
            
            {/* Welcome Section */}
            <h2 className="text-2xl font-bold mb-6 text-blue-600">
              Welcome to MOOSE-Copilot
            </h2>
            <p className="text-gray-700 mb-6">
              Thank you for using MOOSE-Copilot. It is a copilot for researchers,
              assisting in the proposal of preliminary research hypotheses, which can
              be selected and further refined based on individual insights. Currently,
              it is optimized for chemistry and material science researchers.
            </p>

            {/* How to Use Section */}
            <h2 className="text-2xl font-bold mb-6 text-blue-600">
              How to Use MOOSE-Copilot
            </h2>

            <div className="space-y-6 text-gray-800 text-sm leading-relaxed">
              <section>
                <h3 className="font-semibold text-lg text-blue-500">Research Question</h3>
                <p>
                  A detailed research question you are interested in exploring.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-lg text-blue-500">Background Survey</h3>
                <p>
                  Several paragraphs introducing past methods related to the research
                  question. Feel free to include other information such as your own thoughts.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-lg text-blue-500">Inspiration Corpus</h3>
                <p>
                  MOOSE-Copilot searches within this corpus for inspiration to compose new hypotheses. 
                  For trial usage, the corpus can contain around 1,000 entries. The corpus is a collection 
                  of titles and abstracts from existing research papers, and you can customize it by selecting 
                  papers based on your preferred journal names and/or keywords.
                </p>
                <div className="bg-gray-50 border-l-4 border-blue-300 p-4 mt-2 rounded">
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>
                      Use{" "}
                      <a
                        href="https://www.webofscience.com/wos/woscc/summary/0d1f66e0-aebb-4b29-a6c8-d685e04c2ea9-015bae6080/relevance/1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        Web of Science
                      </a>{" "}
                      to search for papers by journal name, and optionally filter by keywords, publication years, and other criteria.
                    </li>
                    <li>Select the desired papers by checking their boxes (you can typically choose &quot;Select All Records&quot;).</li>
                    <li>Click <strong>Export</strong> in the top menu.</li>
                    <li>Choose <strong>Excel</strong> as the export format.</li>
                    <li>Set <strong>Record Content</strong> to &quot;Author, Title, Source, Abstract&quot;.</li>
                    <li>Select <strong>Records 1 to 1000</strong>.</li>
                    <li>Click <strong>Export</strong> to download the file (ensure the file ends with <code>.xlsx</code> or <code>.xls</code>).</li>
                    <li>Upload the downloaded file.</li>
                  </ol>
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-lg text-blue-500">API Type</h3>
                <p>Choose from available API providers: OpenAI, Azure, or Gemini.</p>
              </section>

              <section>
                <h3 className="font-semibold text-lg text-blue-500">API Key</h3>
                <p>
                  Enter your API key. Note that we do not store keys on the backend.
                  You can also use a temporary key.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-lg text-blue-500">Model Name</h3>
                <p>
                  Provide the exact model name from your API provider (e.g., <code>"gpt-4o-mini"</code>).
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-lg text-blue-500">Base URL</h3>
                <p>
                  Only required for OpenAI and Azure users. Gemini users can leave this field empty.
                </p>
              </section>
            </div>

            {/* Note Section */}
            <div className="mt-8 text-gray-800 text-sm leading-relaxed">
              <h2 className="text-2xl font-bold mb-3 text-blue-600">Note</h2>
              <p>
                Due to test-time scaling, the process may take multiple hours to complete.
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Left-side hidden reopen button */}
      <div
        className="fixed top-1/2 left-0 transform -translate-y-1/2 z-40"
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.3")}
        style={{ opacity: 0.3, transition: "opacity 0.3s" }}
      >
        <button
          className="bg-blue-500 text-white px-2 py-3 rounded-r-lg shadow-md hover:bg-blue-600"
          onClick={() => setShowGuide(true)}
        >
          Guide
        </button>
      </div>
    </>
  );
}
