// import React, { useEffect, useState } from "react";
// import { drawTree2 } from "../utils/drawTree2";
// import { motion } from "framer-motion";
// import { useAppContext } from "../context/AppContext";


// // export default function TreeCanvas({ hypothesis }) {
// export default function TreeCanvas2() {
//     const { output2 } = useAppContext(); // 从全局状态中读取
//     const [toastMessage, setToastMessage] = useState(null);
//     const [showToast, setShowToast] = useState(false);
//     const [popupContent, setPopupContent] = useState(null);
//     const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

//     useEffect(() => {
//         if (output2) {
//             // 清除之前的内容，防止叠加
//             const container = document.getElementById("tree-container");
//             if (container) container.innerHTML = "";

//             drawTree2(
//                 output2,
//                 "tree-container",
//                 setToastMessage,
//                 setShowToast,
//                 setPopupContent,
//                 setPopupPosition
//             );
//         }
//     }, [output2]);

//     return (
//         <div className="relative">
//             <h2 className="text-2xl font-semibold text-gray-700 mb-2"> Generated Hypotheses2</h2>
//             <div id="tree-container" className="relative overflow-auto mt-4" style={{ width: "100%", height: "calc(100vh - 160px)" }}></div>

//             {/* 弹出提示 */}
//             {popupContent && (
//                 <motion.div
//                     className="fixed bg-white/90 border border-gray-300 p-3 shadow-xl rounded-lg"
//                     style={{ top: `${popupPosition.y}px`, left: `${popupPosition.x}px`, zIndex: 1000 }}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.8 }}
//                 >
//                     <div className="flex justify-between items-center">
//                         <p className="text-sm font-bold">{popupContent}</p>
//                         <button onClick={() => setPopupContent(null)} className="text-gray-500 hover:text-red-500 transition">✖</button>
//                     </div>
//                 </motion.div>
//             )}

//             {/* 底部 toast 提示 */}
//             {showToast && (
//                 <motion.div
//                     className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 50 }}
//                     transition={{ duration: 0.3 }}
//                 >
//                     {toastMessage}
//                 </motion.div>
//             )}
//         </div>
//     );
// }

import React, { useEffect, useState } from "react";
import { drawTree2 } from "../utils/drawTree2";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { handleTreeFileChange } from "../utils/handleTreeFileChange";

export default function TreeCanvas() {
    const { question,output2,treeFileName2, setTreeFileName2 ,treeFileName2s,taskId,setOutput2} = useAppContext(); // 从全局状态中读取
    const [toastMessage, setToastMessage] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [popupContent, setPopupContent] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        if (output2) {
            // 清除之前的内容，防止叠加
            const container = document.getElementById("tree-container");
            if (container) container.innerHTML = "";

            drawTree2(
                output2,
                question,
                "tree-container",
                setToastMessage,
                setShowToast,
                setPopupContent,
                setPopupPosition
            );
        }
    }, [output2,question]);

    const onSelectChange = (e) => {
        const selectedFile = e.target.value;

        handleTreeFileChange(
            selectedFile,
            taskId,
            setTreeFileName2,
            setOutput2,
            (errorMsg) => {
            setToastMessage(`加载失败：${errorMsg}`);
            setShowToast(true);
            },
            (treeData) => {
            setToastMessage("加载成功！");
            setShowToast(true);
            }
        );
    };

    const handleFileChange = (e) => {
        const file = e.target.value;
        setSelectedFile(file);
        // TODO: 加载选中的 tree 文件，比如 fetch(`/api/loadTree?name=${file}`) 然后设置 output
    };

    return (
        <div className="relative">
            {/* <h2 className="text-2xl font-semibold text-gray-700 mb-2"> Generated Hypotheses1</h2> */}
            {/* 顶部标题和下拉框 */}
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold text-gray-700">Generated Detail Hypotheses</h2>
                <select
                    value={treeFileName2}
                    onChange={(e) => setTreeFileName2(e.target.value)}
                    className="w-96 truncate text-ellipsis overflow-hidden whitespace-nowrap border border-gray-300 rounded px-2 py-1"
                    >
                    {treeFileName2s.map((name) => (
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

// components/TreeGraph.js
// import React, { useState, useEffect } from 'react';
// import Tree from 'react-d3-tree';

// export default function TreeGraph() {
//     const { output2,treeFileName, setTreeFileName ,treeFileNames,taskId,setOutput2} = useAppContext(); // 从全局状态中读取
//   const [treeData, setTreeData] = useState(null);

//   useEffect(() => {
//     fetch('/api/tree/') // 假设你在 Django 后端配置了这个接口
//       .then((res) => res.json())
//       .then((data) => setTreeData(data));
//   }, []);

//   const containerStyles = {
//     width: '100%',
//     height: '100vh'
//   };

//   return (
//     <div style={containerStyles}>
//       {treeData && (
//         <Tree
//           data={treeData}
//           orientation="vertical"
//           separation={{ siblings: 1.5, nonSiblings: 2 }}
//           translate={{ x: 400, y: 50 }}
//           collapsible={false}
//         />
//       )}
//     </div>
//   );
// }

// pages/canvas/tree2.js
// import React from "react";
// import { useAppContext } from "../context/AppContext";
// import TreeViewer from "../utils/TreeViewer";

// export default function Tree2Page() {
//   const { output2 } = useAppContext();

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">MOOSE2 Tree Result</h1>
//       {output2 ? (
//         <TreeViewer data={output2} />
//       ) : (
//         <p className="text-gray-500">No tree data available.</p>
//       )}
//     </div>
//   );
// }

