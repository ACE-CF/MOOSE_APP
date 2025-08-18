// utils/handleFileSubmit.js
export const handleFileSubmit = async ({
    file2,
    MooseVersion,
    setLoading,
    setProgress,
    setOutput,
    setOutput2,
    setTaskId,
    setTreeFileName,
    setTreeFileNames
  }) => {
  if (!file2) {
    alert("Please upload a file2.");
    return;
  }
  if (!MooseVersion) {
    alert("Please select a MOOSE version.");
    return;
  }
  setLoading(true);
  setProgress(20);
  try {
    // 1. 组装 FormData
    const formData = new FormData();
    formData.append("file2", file2);
    formData.append("MOOSE_version", MooseVersion);

    // 2. 发请求到后端
    const res = await fetch("/api/loadfile/", {
      method: "POST",
      body: formData,
    });


    const data = await res.json();
  
    if (data.status === "success") {
        setTimeout(() => {
          setProgress(100);
          setLoading(false);
          const hypothesis = data.hypothesis;
          const taskId = data.task_id;
          if (MooseVersion==1){
            setOutput(hypothesis);
          }
          else{
            setOutput2(hypothesis);
          }
          
          setTaskId(taskId);
        }, 1000);
      } else {
        setLoading(false);
        alert("An error occurred while processing your request: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Request failed: " + error.message);
      setLoading(false);
    }
}
