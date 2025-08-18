// components/RankingPanel.js
import React, { useEffect , useState } from "react";
import { useAppContext } from "../context/AppContext";
// import { handleMoreClick } from "../utils/handleMoreClick";
import DetailCard from "./DetailCard";
export default function RankingPanel() {

    const {
      question,rankingData, setRankingData,hpy1Id,
        taskId, setTaskId,addedDetails, setAddedDetails ,survey, setSurvey,apiKey, setApiKey,modelName
      } = useAppContext();
    const [selectedDetail, setSelectedDetail] = useState(null);

      useEffect(() => {
        if (!taskId) return;
    
        const fetchRankingData = async () => {
          try {
            console.log("taskId:",taskId)
            console.log("modelName:",modelName)
            const res = await fetch(`/api/rank/?task_id=${taskId}&modelName=${modelName}&hpy1Id=${hpy1Id}`);      
            const data = await res.json();   
            if (data.status === "success") {
              setRankingData(data.rankingData);
            } else {
              console.error("Failed to fetch ranking:", data.message);
            }
          } catch (err) { 
            console.error("Error fetching ranking data:", err);
          }
        };
    
        fetchRankingData();
      }, [taskId,modelName, setRankingData,hpy1Id]);

      const onMoreClick = (hypothesisText, hypothesisId,feedback) => {
        setSelectedDetail({ 
          hypothesisId: hypothesisId,
          hypothesisText: hypothesisText,
          feedback:feedback,
        });
      };


    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Ranking of Hypotheses</h2>
        <table className="w-full text-left border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Rank</th>
              <th className="p-2 border">Averaged Score</th>
              <th className="p-2 border">Hypothesis</th>
              {/* <th className="p-2 border">Score List</th> */}
              <th className="p-2 border">Rounds</th>
              <th className="p-2 border text-center">More</th>
            </tr>
          </thead>
          <tbody>
            {rankingData.map((item) => (
              <tr key={item["Rank"]} className="hover:bg-gray-50">
                <td className="p-2 border">{item["Rank"]}</td>
                <td className="p-2 border">{item["AveragedScore"]}</td>
                <td className="p-2 border">{item["Hypothesis"]}</td>
                {/* <td className="p-2 border">{item["ScoreList"].join(", ")}</td> */}
                <td className="p-2 border">{item["NumRounds"]}</td>
                <td className="p-2 border text-center">
                  <button
                    className="text-blue-600 hover:underline hover:text-blue-800"
                    onClick={() => onMoreClick(item["Hypothesis"], item["Rank"])}
                  >
                    More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        
        

        {/* 弹出详情卡片 */}
        {/* 这里可以加一个逻辑，就是如果点击已经获得的假说内容，就直接从前端加载，如果没有再放到后端去生成 */}
        {selectedDetail && (
        <DetailCard
          details={selectedDetail}
          onClose={() => setSelectedDetail(null)}
        />
        )}
      </div>
    );
  }