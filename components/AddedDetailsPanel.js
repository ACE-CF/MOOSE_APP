// // components/AddedDetailsPanel.js
// import React from "react";
// import { useAppContext } from "../context/AppContext";

// export default function AddedDetailsPanel() {
//   const { addedDetails } = useAppContext(); //  用 context 拿到存的

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Added Hypotheses</h2>
//       {addedDetails.length === 0 ? (
//         <p className="text-gray-500">No hypotheses added yet.</p>
//       ) : (
//         <table className="w-full text-left border border-gray-300 rounded">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2 border">Question</th>
//               <th className="p-2 border">Ooarse-grained Hypothesis</th>
//               <th className="p-2 border text-center">Output Hypothesis</th>
//             </tr>
//           </thead>
//           <tbody>
//             {addedDetails.map((item, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="p-2 border">{item.question}</td>
//                 <td className="p-2 border">{item.hypothesisText}</td>
//                 <td className="p-2 border">{item.details}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
// 下面是用卡片来表示的，如果更喜欢这种可以改

// components/AddedDetailsPanel.js
import React from "react";
import { useAppContext } from "../context/AppContext";

export default function AddedDetailsPanel() {
  const { addedDetails, setAddedDetails } = useAppContext(); // 加上 setAddedDetails 方便删除

  const handleDelete = (indexToDelete) => {
    setAddedDetails(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Added Hypotheses</h2>

      {addedDetails.length === 0 ? (
        <p className="text-gray-500">No hypotheses added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md: gap-4">
          {addedDetails.map((item, index) => (
            <div
              key={index}
              className="relative border rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              {/* 删除按钮 */}
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                onClick={() => handleDelete(index)}
              >
                ❌
              </button>

              <h3 className="text-lg font-semibold mb-2">Question:</h3>
              <p className="text-gray-700 mb-4">{item.question}</p>

              <h3 className="text-lg font-semibold mb-2">Coarse-grained Hypothesis:</h3>
              <p className="text-gray-700 mb-4">{item.hypothesisText}</p>

              <h3 className="text-lg font-semibold mb-2">Output Hypothesis:</h3>
              <p className="text-gray-700">{item.details}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
