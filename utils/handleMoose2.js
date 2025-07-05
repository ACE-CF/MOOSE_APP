export async function handleMoose2Click({
    question,
    survey,
    apiKey,
    modelName,
    baseUrl,
    apiType,
    taskId,
    feedback,
    hpy2Id, setHpy2Id,
    hypothesisText,
    onSuccess,
    onError
    }) {
    //更新数值
    const newHpy2Id = hpy2Id + 1;
    // const newHpy2Id = 1;

    const formData = new FormData();
    formData.append("question", question);
    formData.append("survey", survey);
    formData.append("apiKey", apiKey);
    formData.append("modelName", modelName);
    formData.append("baseUrl", baseUrl); // 可空或设置默认
    formData.append("apiType", apiType); // openai / azure / gemini
    formData.append("taskId", taskId);
    formData.append("hpy2Id", newHpy2Id);
    formData.append("feedback", feedback);
    formData.append("hypothesisText", hypothesisText);

    try {
        // const response = await fetch("http://127.0.0.1:8000/api/get_feedback_moose2/", {
        const response = await fetch("/api/get_feedback_moose2/", {
        method: "POST",
        body: formData,
        });
        const result = await response.json();
        if (response.ok) {
        console.log("MOOSE1 success:", result);
        setHpy2Id(newHpy2Id);
        if (onSuccess) onSuccess(result);
        } else {
        throw new Error(result.error || "Unknown error");
        }
    } catch (error) {
        console.error("MOOSE1 failed:", error);
        if (onError) onError(error.message);
        alert("Failed to run MOOSE2. Please check the console for details.");
    }
}
