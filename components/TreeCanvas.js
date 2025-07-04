import React, { useEffect, useState } from "react";
import { drawTree } from "../utils/drawTree";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { handleTreeFileChange } from "../utils/handleTreeFileChange";

// export default function TreeCanvas({ hypothesis }) {
export default function TreeCanvas() {
    const { output,treeFileName, setTreeFileName ,treeFileNames,taskId,setOutput} = useAppContext(); // 从全局状态中读取
    const [toastMessage, setToastMessage] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [popupContent, setPopupContent] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        if (output) {
            // 清除之前的内容，防止叠加
            const container = document.getElementById("tree-container");
            if (container) container.innerHTML = "";

            drawTree(
                output,
                "tree-container",
                setToastMessage,
                setShowToast,
                setPopupContent,
                setPopupPosition
            );
        }
    }, [output]);

    const onSelectChange = (e) => {
        const selectedFile = e.target.value;

        handleTreeFileChange(
            selectedFile,
            taskId,
            setTreeFileName,
            setOutput,
            (errorMsg) => {
            setToastMessage(`Loading failed:${errorMsg}`);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            },
            (treeData) => {
            setToastMessage("Loading successful!");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            }
        );
    };

    return (
        <div className="relative">
            {/* <h2 className="text-2xl font-semibold text-gray-700 mb-2"> Generated Hypotheses1</h2> */}
            {/* 顶部标题和下拉框 */}
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold text-gray-700">Generated Hypotheses1</h2>

                <select
                    value={treeFileName}
                    onChange={onSelectChange}
                    >
                    {treeFileNames.map((name) => (
                        <option key={name} value={name}>
                        {name}
                        </option>
                    ))}
                </select>

            </div>

            {/* 树状图容器 */}
            <div id="tree-container" className="relative mt-4" style={{ width: "100%", height: "calc(100vh - 160px)" }}></div>

            {/* 弹出提示 */}
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
                        <button onClick={() => setPopupContent(null)} className="text-gray-500 hover:text-red-500 transition">✖</button>
                    </div>
                </motion.div>
            )}

            {/* 底部 toast 提示 */}
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
        </div>
    );
}
