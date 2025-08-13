import { useState } from "react";
import FormPanel from "../../components/FormPanel";
import CanvasWrapper from "../../components/CanvasWrapper";
import AddedDetailsPanel from "../../components/AddedDetailsPanel"; // 默认页显示树图
import { handleSubmit as submitHandler } from "../../utils/handleSubmit";
import { useAppContext } from "../../context/AppContext";
import UserGuide from "../../components/UserGuide"; 
export default function HomePage() {
    
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const {
        question, setQuestion,
        survey, setSurvey,
        apiKey, setApiKey,apiType, setApiType,
        modelName, setModelName,baseUrl, setBaseUrl,
        file, setFile,
        setOutput,setTaskId,hpy1Id, setHpy1Id,setHpy2Id,
        treeFileName, setTreeFileName,
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
            <FormPanel {...{ question, setQuestion,apiType, setApiType, survey, setSurvey, apiKey, setApiKey, modelName, setModelName,baseUrl, setBaseUrl,file, setFile, handleSubmit, loading, progress }} />
            <CanvasWrapper>
                <AddedDetailsPanel />
            </CanvasWrapper>
            <UserGuide />
        </div>
    );
}