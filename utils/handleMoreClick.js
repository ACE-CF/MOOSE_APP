// utils/handleMoreClick.js

export const handleMoreClick = async (hypothesisText, question, survey,taskId,api_key,hypothesisid,onSuccess, onError) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/hypothesis_details/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ hypothesis_text: hypothesisText,question: question, survey:survey,taskId:taskId,apiKey:api_key,hypothesisid:hypothesisid})
      });
  
      const data = await res.json();
  
      if (data.status === "success") {
        console.log("Received details:", data.details);
        if (onSuccess) onSuccess(data.details); // 回调给调用者
      } else {
        console.error("Error fetching details:", data.message);
        if (onError) onError(data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
      if (onError) onError(error.message);
    }
  };
  