import React, { useState, useEffect } from "react";
import { Button, TextField, LinearProgress, CircularProgress, Card, CardContent } from "@mui/material";
import { useRouter } from "next/router";
import { motion } from "framer-motion"; // 🎭 增加动画
import { drawTree } from "../utils/drawTree";


export default function ResearchForm() {
    const [question, setQuestion] = useState("");
    const [survey, setSurvey] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [output, setOutput] = useState(null);
    const [popupContent, setPopupContent] = useState(null);
    const router = useRouter();
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

    //复制弹出
    const [toastMessage, setToastMessage] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [hypothesis, setHypothesis] = useState(null);


    useEffect(() => {
        if (hypothesis) {
          drawTree(
            hypothesis,
            "tree-container",
            setToastMessage,
            setShowToast,
            setPopupContent,
            setPopupPosition
          );
        }
      }, [hypothesis]);
      

    const handleSubmit = async () => {
        setLoading(true);
        setProgress(20);

        const formData = new FormData();
        formData.append("question", question);
        formData.append("survey", survey);
        formData.append("apiKey", apiKey);
        if (file) formData.append("file", file);

        setTimeout(() => setProgress(50), 1000);
        setTimeout(() => setProgress(80), 2000);

        try {
            // 发送 POST 请求到后端   http://127.0.0.1:8000/api/analyze/   /api/analyze
            const response = await fetch("/api/analyze/", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            // 检查返回的 status 是否为 success
            if (data.status === 'success') {
                setTimeout(() => {
                    setProgress(100);
                    setLoading(false);

                    // 将 hypothesis 数据传递给树形图渲染函数
                    const hypothesis = data.hypothesis;
                    setOutput(hypothesis);  // 设置输出数据，供 D3.js 渲染
                    // drawTree(hypothesis);    // 绘制树形图
                    // 原来的：drawTree(hypothesis);
                    drawTree(
                        hypothesis,
                        "tree-container",
                        setToastMessage,
                        setShowToast,
                        setPopupContent,
                        setPopupPosition
                    );

                }, 1000);
            } else {
                setLoading(false);
                alert("Hypothesis generation failed");
            }
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };
   
    return (
        <>
            <div className="flex h-screen p-4">

                {/*  左侧表单部分 */}
                <Card className="w-1/3 p-6 shadow-xl bg-white rounded-xl">
                    <CardContent>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">💡 Research Question</h2>
                        <TextField
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            label="Enter your question"
                            fullWidth
                            className="mb-4 border rounded-md" // 🌟 让输入框更柔和
                        />

                        <h2 className="text-xl font-semibold text-gray-700">📄 Background Survey</h2>
                        <TextField
                            value={survey}
                            onChange={(e) => setSurvey(e.target.value)}
                            label="Enter background survey"
                            fullWidth
                            className="mb-4 border rounded-md"
                        />

                        <h2 className="text-xl font-semibold text-gray-700">📂 Upload File</h2>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4" />

                        <h2 className="text-xl font-semibold text-gray-700">🔑 API Key</h2>
                        <TextField
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            label="Enter API Key"
                            fullWidth
                            className="mb-4 border rounded-md"
                        />

                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                        </Button>

                        {loading && <LinearProgress variant="determinate" value={progress} className="mt-4" />}
                    </CardContent>
                </Card>

                {/* 🌟 右侧增加间距 */}
                <Card className="w-2/3 p-6 ml-6 shadow-xl bg-white rounded-xl overflow-auto">
                    <CardContent>
                        <h2 className="text-2xl font-semibold text-gray-700"> Generated Hypotheses</h2>
                        <div id="tree-container" className="relative overflow-auto mt-4" style={{ width: "100%", height: "calc(100vh - 100px)", overflowX: "auto" }}></div>
                    </CardContent>
                </Card>

                {popupContent && (
                    <motion.div
                        className="fixed bg-white/90 border border-gray-300 p-3 shadow-xl rounded-lg"
                        style={{ top: `${popupPosition.y}px`, left: `${popupPosition.x}px`, zIndex: 1000 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-bold">{popupContent}</p>
                            {/* 🔴 关闭按钮 */}
                            <button onClick={() => setPopupContent(null)} className="text-gray-500 hover:text-red-500 transition">
                                ✖
                            </button>
                        </div>
                    </motion.div>
                )}

            </div >
            {showToast && (
                <motion.div
                    className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.3 }}
                >
                    {toastMessage}
                </motion.div>
            )}

        </>
    );
}