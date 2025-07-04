
// export const handleMoose1 = async ({
//     question,
//     survey,
//     apiKey,
//     apiType,
//     modelName,
//     baseUrl,
//     file,
//     setLoading,
//     setProgress,
//     setOutput,
//     setTaskId,
//     setTreeFileName,
//     setTreeFileNames
//   }) => {
//     setLoading(true);
//     setProgress(20);
  
//     const formData = new FormData();
//     formData.append("question", question);
//     formData.append("survey", survey);
//     formData.append("apiKey", apiKey);
//     formData.append("modelName", modelName);
//     formData.append("baseUrl", baseUrl);
//     formData.append("apiType", apiType);
//     if (file) formData.append("file", file);
  
//     setTimeout(() => setProgress(50), 1000);
//     setTimeout(() => setProgress(80), 2000);
  
//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/analyze/", {
//         method: "POST",
//         body: formData,
//       });
  
//       const data = await response.json();
  
//       if (data.status === "success") {
//         setTimeout(() => {
//           setProgress(100);
//           setLoading(false);
  
//           const hypothesis = data.hypothesis;
//           const taskId = data.task_id;
//           const fileName = data.file_name;
//           setTreeFileName(fileName);
//           setTreeFileNames((prev) => {
//             return prev.includes(fileName) ? prev : [...prev, fileName];
//           });
//           setOutput(hypothesis);
//           setTaskId(taskId);
//         }, 1000);
//       } else {
//         setLoading(false);
//         alert("Hypothesis generation failed");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setLoading(false);
//     }
//   };

// utils/handleMoose1.js

export async function handleMoose1Click({
  apiKey,
  modelName,
  baseUrl,
  apiType,
  taskId,
  feedback,
  hpy1Id, setHpy1Id,
  hypothesisText,
  // hypothesisId,
  // router,
  onSuccess,
  onError
}) {
  //更新数值
  const newHpy1Id = hpy1Id + 1;
  // setHpy1Id(newHpy1Id);

  const formData = new FormData();
  formData.append("apiKey", apiKey);
  formData.append("modelName", modelName);
  formData.append("baseUrl", baseUrl); // 可空或设置默认
  formData.append("apiType", apiType); // openai / azure / gemini
  formData.append("taskId", taskId);
  formData.append("hpy1Id", newHpy1Id);
  formData.append("feedback", feedback);
  formData.append("hypothesisText", hypothesisText);

  try {
    const response = await fetch("http://127.0.0.1:8000/api/get_feedback_moose1/", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    console.log("MOOSE1 check:", result);
    if (result.status === "success") {
      console.log("MOOSE1 success:", result);
      setHpy1Id(newHpy1Id);
      if (onSuccess) onSuccess(result);
      // if (router) router.push("/canvas/tree");
    } else {
      throw new Error(result.error || "Unknown error");
    }
  } catch (error) {
    console.error("MOOSE1 failed:", error);
    if (onError) onError(error.message);
    alert("Failed to run MOOSE1. Please check the console for details.");
  }
}
