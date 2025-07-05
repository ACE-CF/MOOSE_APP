// // components/DetailCard.js
// import React from "react";

// export default function DetailCard({ details, onClose, onAdd }) {
//   if (!details) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-2/3 max-w-3xl relative">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-lg font-bold"
//         >
//           ×
//         </button>

//         <h2 className="text-xl font-bold mb-4">Hypothesis Details</h2>

//         {/* 内容区域，设置最大高度 + 滚动 */}
//         <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
//           <div><strong>Question:</strong> {details.question}</div>
//           <div><strong>Ooarse-grained Hypothesis:</strong> {details.hypothesisText}</div>
//           {/* <div><strong>Output Hypothesis:</strong> {details.details}</div> */}
//           <div>
//             <strong>Output Hypothesis:</strong>
//             {typeof details.details === "object" ? (
//               <div className="ml-4">
//                 <p><strong>ID:</strong> {details.details["Hypothesis ID"]}</p>
//                 <p><strong>Text:</strong> {details.details["Hypothesis"]}</p>
//               </div>
//             ) : (
//               <p>{details.details}</p>
//             )}
//           </div>
//           {/* 可以在这里继续列出更多字段 */}
//         </div>

//         {/* Add按钮 */}
//         <button
//           onClick={onAdd}
//           className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl"
//         >
//           Add
//         </button>
//       </div>
//     </div>
//   );
// }

// components/DetailCard.js
import React, { useState } from "react";
import { useRouter } from "next/router";
// import { handleMoreClick } from "../utils/handleMoreClick";
import { useAppContext } from "../context/AppContext";
import { handleMoose1Click } from "../utils/handleMoose1";
import { handleMoose2Click } from "../utils/handleMoose2";

export default function DetailCard({ details, onClose}) {
  const {
      question,setOutput2,setOutput,setTreeFileName,
      setTreeFileNames,setTreeFileName2,
      setTreeFileName2s,
      taskId, survey,apiKey, modelName,
      baseUrl,
      apiType,
      hpy1Id, setHpy1Id,hpy2Id, setHpy2Id,
        } = useAppContext();
  const router = useRouter();
  const [feedback, setFeedback] = useState("");

  if (!details) return null;

  
  const handleClickMoose1 = () => {
    handleMoose1Click({
      apiKey,
      modelName,
      baseUrl,
      apiType,
      taskId,
      feedback,
      hpy1Id, setHpy1Id,
      hypothesisText: details.hypothesisText, 
      onSuccess: (res) => {
        console.log("handleMoose1 success:", res);
        setOutput(res.hypothesis)
        const fileName = res.file_name;
        setTreeFileName(fileName);
        setTreeFileNames((prev) => {
          return prev.includes(fileName) ? prev : [...prev, fileName];
        });
        router.push("/canvas/tree"); // 或其他页面跳转
      },
      onError: (err) => {
        console.error("handleMoose1 error:", err);
        alert("MOOSE1 operation failed: " + err);
      },
    });
  };
  const handleClickMoose2 = () => {
    handleMoose2Click({
      question,
      survey,
      apiKey,
      modelName,
      baseUrl,
      apiType,
      taskId,
      feedback,
      hpy2Id, setHpy2Id,
      hypothesisText: details.hypothesisText, 
      onSuccess: (res) => {
        console.log("handleMoose2 success2:", res);
        setOutput2(res.hypothesis)
        const fileName2 = res.file_name;
        setTreeFileName2(fileName2);
        setTreeFileName2s((prev) => {
          return prev.includes(fileName2) ? prev : [...prev, fileName2];
        });
        router.push("/canvas/tree2"); // 或其他页面跳转
        
      },
      onError: (err) => {
        console.error("handleMoose1 error:", err);
        alert("MOOSE2 operation failed: " + err);
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-2/3 max-w-4xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-lg font-bold"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">Hypothesis Details</h2>

        {/* 左右布局部分 */}
        <div className="flex gap-6 max-h-[400px]">
          {/* 左侧：可滚动区域 ，展示信息*/}
          <div className="w-1/2 space-y-3 overflow-y-auto pr-2 border-r border-gray-300">
            <div>
              <strong>Question:</strong>
              <p>{question}</p>
            </div>
            <div>
              <strong>Hypothesis:</strong>
              <p>{details.hypothesisText}</p>
            </div>
            {/* 如果左侧内容很多，也可以继续往下加 */}
          </div>

          {/* 右侧：反馈输入，固定不滚动 */}
          <div className="w-1/2 space-y-2 pl-2">
            <label className="block font-semibold mb-1">Feedback (Optional):</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter your feedback here (optional)"
              className="w-full h-72 p-2 border border-gray-300 rounded-lg resize-none"
            />
          </div>
        </div>


        {/* 底部按钮 */}
        <div className="mt-6 flex justify-end gap-4">
           <button
            onClick={handleClickMoose1}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl"
          >
            MOOSE1
          </button>
            <button
            onClick={handleClickMoose2}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl"
          >
            MOOSE2
          </button>
        </div>
      </div>
    </div>
  );
}



  // const handleMoose1Click = async () => {
  //   const formData = new FormData();
  //   formData.append("apiKey", apiKey);
  //   formData.append("modelName", "gemini-2.5-flash"); // 或动态设置
  //   formData.append("baseUrl", ""); // 如果你有 baseUrl，请填入，或设置默认值
  //   formData.append("apiType", "gemini"); // openai / azure / gemini 等
  //   formData.append("taskId", taskId);
  //   formData.append("feedback", feedback);
  //   formData.append("hypothesisText", details.hypothesisText);

  //   try {
  //     const response = await fetch("/api/get_feedback_moose1/", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const result = await response.json();
  //     if (response.ok) {
  //       console.log("MOOSE1 success:", result);
  //       router.push("/canvas/tree");
  //     } else {
  //       throw new Error(result.error || "Unknown error");
  //     }
  //   } catch (error) {
  //     console.error("MOOSE1 failed:", error);
  //     alert("Failed to run MOOSE1. Please check the console for details.");
  //   }
  // };
  // const handleMoose1Click = () => {
  //   //这里是将feedback和survey拼接到一起了，如果后续有其他要求再修改
  //   // const updatedSurvey = `${survey}\n\n[User Feedback]: ${feedback}`;
  //   //好像不需要我去拼接了，可以直接传到后端去
  //   handleMoreClick(
  //     details.hypothesisText,
  //     question,
  //     feedback,
  //     taskId,
  //     apiKey,
  //     details.hypothesisId,
  //     (newDetails) => {
  //       console.log("newDetails:",newDetails)
  //       // 跳转到 /canvas/tree2
  //       router.push("/canvas/tree");
  //     },
  //     (errorMessage) => {
  //       console.error("MOOSE1 failed:", errorMessage);
  //       alert("Failed to fetch hypothesis details. Please try again.");
  //     }
  //   );
  // };

  // const handleMoose2Click = () => {
  //   //这里是将feedback和survey拼接到一起了，如果后续有其他要求再修改
  //   const updatedSurvey = `${survey}\n\n[User Feedback]: ${feedback}`;

  //   handleMoreClick(
  //     details.hypothesisText,
  //     question,
  //     updatedSurvey,
  //     taskId,
  //     apiKey,
  //     details.hypothesisId,
  //     (newDetails) => {
  //       console.log("newDetails:",newDetails)
  //       // 跳转到 /canvas/tree2
  //       router.push("/canvas/tree2");
  //     },
  //     (errorMessage) => {
  //       console.error("MOOSE1 failed:", errorMessage);
  //       alert("Failed to fetch hypothesis details. Please try again.");
  //     }
  //   );
  // };