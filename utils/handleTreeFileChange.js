// utils/handleTreeFileChange.js

export const handleTreeFileChange = async (
  fileName,
  taskId,
  setTreeFileName,
  setOutput,
  onError,
  onSuccess
) => {
  try {
    const res = await fetch("/api/load_tree/", {
    // const res = await fetch("http://127.0.0.1:8000/api/load_tree/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ file_name: fileName ,task_id:taskId}) // 向后端传递文件名
    });

    const data = await res.json();

    if (data.status === "success") {
      console.log("Tree data received:", data.hypothesis);
      setTreeFileName(fileName);
      setOutput(data.hypothesis); // 假设后端返回字段是 { status: "success", tree: {...} }
      if (onSuccess) onSuccess(data.hypothesis);
    } else {
      console.error("Failed to load tree:", data.message);
      if (onError) onError(data.message);
    }
  } catch (error) {
    console.error("Network error while loading tree:", error);
    if (onError) onError(error.message);
  }
};
