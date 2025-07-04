// context/AppContext.js
import { createContext, useContext, useState } from "react";

// 创建 Context
const AppContext = createContext();

// 创建 Provider 包裹应用
export function AppProvider({ children }) {
  const [output, setOutput] = useState(null);           // 树结构数据
  const [output2, setOutput2] = useState(null);           // 树2结构数据
  const [rankingData, setRankingData] = useState([]);   // 排名列表数据
  const [rankingData2, setRankingData2] = useState([]);  
  const [addedDetails, setAddedDetails] = useState([]);  // ⭐ 新增：存储 Add 的卡片内容
  const [treeFileName, setTreeFileName] = useState("");//当前选择展示树1文件
  const [treeFileNames, setTreeFileNames] = useState([]);//所有保存的树1文件
  const [treeFileName2, setTreeFileName2] = useState("");//当前选择展示树2文件
  const [treeFileName2s, setTreeFileName2s] = useState([]);//所有保存的树2文件
  // 添加表单字段状态
  const [question, setQuestion] = useState("");
  const [survey, setSurvey] = useState("");
  const [apiType, setApiType] = useState("openai");
  const [apiKey, setApiKey] = useState("");
  const [taskId, setTaskId] = useState(""); 
  const [hpy1Id, setHpy1Id] = useState(""); 
  const [hpy2Id, setHpy2Id] = useState(0); 
  const [nowhpy1Id, setNowHpy1Id] = useState(""); 
  const [nowhpy2Id, setNowHpy2Id] = useState(0); 
  const [modelName, setModelName] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [file, setFile] = useState();
  

  return (
    <AppContext.Provider value={{nowhpy1Id, setNowHpy1Id,nowhpy2Id, setNowHpy2Id,rankingData2, setRankingData2,treeFileName2, setTreeFileName2,treeFileName2s, setTreeFileName2s,output2, setOutput2,hpy1Id, setHpy1Id,hpy2Id, setHpy2Id,modelName, setModelName,apiType, setApiType,baseUrl, setBaseUrl,taskId, setTaskId,output, setOutput,addedDetails, setAddedDetails,  rankingData, setRankingData ,question, setQuestion,survey, setSurvey,apiKey, setApiKey,file, setFile,treeFileNames, setTreeFileNames,treeFileName, setTreeFileName,}}>
      {children}
    </AppContext.Provider>
  );
}

// 自定义 Hook，方便使用
export function useAppContext() {
  return useContext(AppContext);
}
