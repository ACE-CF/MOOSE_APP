// pages/api/analyze.js

export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  
    // const sampleResponse = {}
    //   };
  
      try {
        // 从请求体中获取数据
        const { researchQuestion, background, apiKey } = req.body;
        
        // 调用真正的后端 API（假设后端有 /process-analyze API）
        const response = await fetch("https://your-backend-url.com/process-analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({ researchQuestion, background })
        });

        if (!response.ok) {
            throw new Error("Failed to fetch from backend");
        }

        const data = await response.json();
        res.status(200).json(data);  // 返回后端真正的数据
        console.log("后端返回的数据:", data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    // Return the simulated data to the frontend
    res.status(200).json(sampleResponse);
  }
  