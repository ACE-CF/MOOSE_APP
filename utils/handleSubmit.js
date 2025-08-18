// utils/handleSubmit.js
// import { drawTree } from "../utils/drawTree";
// import { useAppContext } from "../context/AppContext"; // 导入 useAppContext

export const handleSubmit = async ({
    question,
    survey,
    apiKey,
    apiType,
    modelName,
    baseUrl,
    file,
    hpy1Id, setHpy1Id,setHpy2Id,
    setLoading,
    setProgress,
    setOutput,
    setTaskId,
    setTreeFileName,
    setTreeFileNames
  }) => {
    setLoading(true);
    setProgress(20);
  
    const newHpy1Id = 0;
    const newHpy2Id = 0;
    setHpy1Id(newHpy1Id);
    setHpy2Id(newHpy2Id);
    const formData = new FormData();
    formData.append("question", question);
    formData.append("survey", survey);
    formData.append("apiKey", apiKey);
    formData.append("hpy1Id", newHpy1Id);
    formData.append("modelName", modelName);
    formData.append("baseUrl", baseUrl);
    formData.append("apiType", apiType);
    if (file) formData.append("file", file);
  
    setTimeout(() => setProgress(50), 1000);
    setTimeout(() => setProgress(80), 2000);
  
    try {
      const response = await fetch("https://moosedemo.com/api/analyze/", {
      // const response = await fetch("/api/analyze/", {
      // const response = await fetch("http://127.0.0.1:8000/api/analyze/", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
  
      if (data.status === "success") {
        setTimeout(() => {
          setProgress(100);
          setLoading(false);
          const hypothesis = data.hypothesis;
          const taskId = data.task_id;
          const fileName = data.file_name;
          setTreeFileName(fileName);
          setTreeFileNames((prev) => {
            return prev.includes(fileName) ? prev : [...prev, fileName];
          });
          setOutput(hypothesis);
          setTaskId(taskId);
        }, 1000);
      } else {
        setLoading(false);
        alert("An error occurred while processing your request: " + data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Request failed: " + error.message);
      setLoading(false);
    }
  };
  