// import { useState } from "react";
import FormPanel from "../../components/FormPanel";
import CanvasWrapper from "../../components/CanvasWrapper";
import RankingPanel from "../../components/RankingPanel";
import { useState } from "react";  // 导入 useEffect
import { useAppContext } from "../../context/AppContext";
import { handleSubmit as submitHandler } from "../../utils/handleSubmit";

export default function GraphViewPage() {
  // 保持左侧表单状态
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const {
    question, setQuestion,
    survey, setSurvey,apiType, setApiType,
    apiKey, setApiKey,modelName, setModelName,baseUrl, setBaseUrl,
    file, setFile,setOutput,setTaskId,
        treeFileName, setTreeFileName,hpy1Id, setHpy1Id,setHpy2Id,
        treeFileNames,setTreeFileNames
  } = useAppContext();
  
  const handleSubmit = () => {
    submitHandler({
      question,
      survey,
      apiKey,
      apiType,
      modelName,
      baseUrl,
      file,
      hpy1Id, setHpy1Id,setHpy2Id,
      setLoading,
      setProgress,
      setOutput,
      setTaskId,
      setTreeFileName,
      setTreeFileNames
    });
  };

  return (
          <div className="flex h-screen p-4">
              <FormPanel {...{ question,setQuestion,apiType, setApiType, survey, setSurvey, apiKey, setApiKey,modelName, setModelName,baseUrl, setBaseUrl, file, setFile, handleSubmit, loading, progress }} />
              <CanvasWrapper>
                <RankingPanel />
              </CanvasWrapper>
          </div>
      );
}