import { useState, useEffect } from "react";

export default function UserGuide() {
  const [showGuide, setShowGuide] = useState(false);

  // Auto show on page load
  useEffect(() => {
    setShowGuide(true);
  }, []);

  return (
    <>
      {showGuide && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl w-[650px] max-h-[80vh] overflow-y-auto relative p-8">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">
              Welcome to MOOSE-Copilot
            </h2>

            <p className="text-gray-700 mb-6">
              Thank you for using MOOSE-Copilot. It is a copilot for researchers to help propose preliminary research hypotheses (currently, it is more adapted for chemistry and material science researchers).
            </p>

            <div className="space-y-6 text-gray-800 text-sm leading-relaxed">
              <section>
                <h3 className="font-semibold text-lg text-blue-500">Research Question</h3>
                <p>A detailed research question you’re interested in</p>
              </section>

              <section>
                <h3 className="font-semibold text-lg text-blue-500">Background Survey</h3>
                <p>Several paragraphs introducing the past methods for the research question. Your insights or thoughts can also be written in here.</p>
              </section>

              <section>
                <h3 className="font-semibold text-lg text-blue-500">Inspiration Corpus</h3>
                <p>
                  MOOSE-Copilot searches for inspirations to compose new hypothesis with this corpus. It is basically a list of [title, abstract] of existing literature. It can be downloaded in batch from Web of Science, with your customized journal names and/or keywords input.
                </p>
                <div className="bg-gray-50 border-l-4 border-blue-300 p-4 mt-2 rounded">
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Use Web of Science to search for papers by journal name and optionally filter with keywords</li>
                    <li>Select the desired papers by checking their boxes</li>
                    <li>Click “Export” in the top menu</li>
                    <li>Choose “Excel” as the format</li>
                    <li>Set “Record Content” to “Author, Title, Source, Abstract”</li>
                    <li>Click “Export” to download the file (which should have “.xlsx” or “.xls extension”)</li>
                    <li>Upload the downloaded file</li>
                  </ol>
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-lg text-blue-500">API Type</h3>
                <p>Currently we support API key from OpenAI, Azure, and Gemini</p>
              </section>

              <section>
                <h3 className="font-semibold text-lg text-blue-500">API Key</h3>
                <p>Your API key. We don’t store any key in the backend. You can also use a temporary key here.</p>
              </section>

              <section>
                <h3 className="font-semibold text-lg text-blue-500">Model Name</h3>
                <p>The exact model name from your key provider (e.g., “gpt-4o-mini”)</p>
              </section>

              <section>
                <h3 className="font-semibold text-lg text-blue-500">Base URL</h3>
                <p>Only OpenAI and Azure key needs it. Gemini users can leave it empty.</p>
              </section>

              <section>
                <h3 className="font-semibold text-lg text-blue-500">Note</h3>
                <p>Because of test-time-scaling we use, it might take up to a few hours to complete.</p>
              </section>
            </div>

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
