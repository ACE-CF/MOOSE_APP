// import { useState } from "react";
import FormPanel from "../../components/FormPanel";
import CanvasWrapper from "../../components/CanvasWrapper";
import RankingPanel2 from "../../components/RankingPanel2";
import { useState } from "react";  // 导入 useEffect
import { useAppContext } from "../../context/AppContext";
import { handleSubmit as submitHandler } from "../../utils/handleSubmit";
import { handleFileSubmit as fileHandler } from "../../utils/handleFileSubmit";
import UserGuide from "../../components/UserGuide"; 

export default function GraphViewPage() {
  // 保持左侧表单状态
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const {
     MooseVersion, setMooseVersion,setOutput2,
    question, setQuestion,
    survey, setSurvey,apiType, setApiType,
    apiKey, setApiKey,modelName, setModelName,baseUrl, setBaseUrl,
    file, setFile,file2,setFile2,setOutput,setTaskId,
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
    const handleFileSubmit = () => {
      fileHandler({
        file2,
        MooseVersion,
        setLoading,
        setProgress,
        setOutput,
        setOutput2,
        setTaskId,
        setTreeFileName,
        setTreeFileNames
      });
    };
  return (
          <div className="flex h-screen p-4">
              <FormPanel {...{ handleFileSubmit, MooseVersion, setMooseVersion,question,setQuestion,apiType, setApiType, survey, setSurvey, apiKey, setApiKey,modelName, setModelName,baseUrl, setBaseUrl, file, setFile, file2,setFile2,handleSubmit, loading, progress }} />
              <CanvasWrapper>
                <RankingPanel2 />
              </CanvasWrapper>
              <UserGuide />
          </div>
      );
}