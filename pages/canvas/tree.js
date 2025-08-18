import { useState } from "react";
import FormPanel from "../../components/FormPanel";
import CanvasWrapper from "../../components/CanvasWrapper";
import TreeCanvas from "../../components/TreeCanvas"; // 默认页显示树图
import { handleSubmit as submitHandler } from "../../utils/handleSubmit";
import { handleFileSubmit as fileHandler } from "../../utils/handleFileSubmit";
import { useAppContext } from "../../context/AppContext";
import UserGuide from "../../components/UserGuide"; 
export default function HomePage() {
    
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const {
       MooseVersion, setMooseVersion,setOutput2,
        question, setQuestion,
        survey, setSurvey,
        apiKey, setApiKey,
        modelName, setModelName,baseUrl, setBaseUrl,
        file, setFile,file2,setFile2,apiType, setApiType,
        setOutput,setTaskId,hpy1Id, setHpy1Id,setHpy2Id,
        treeFileName, setTreeFileName,
        treeFileNames,setTreeFileNames
      } = useAppContext();

    console.log("treeFileName typeof:", typeof treeFileName);
    console.log("setTreeFileName typeof:", typeof setTreeFileName);
    console.log("question typeof:", typeof question);


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
            <FormPanel {...{ handleFileSubmit, MooseVersion, setMooseVersion,question, setQuestion, apiType, setApiType,survey, setSurvey, apiKey,modelName, setModelName,baseUrl, setBaseUrl, setApiKey, file, setFile,file2,setFile2,handleSubmit, loading, progress }} />
            <CanvasWrapper>
                <TreeCanvas />
            </CanvasWrapper>
            <UserGuide />
        </div>
    );
}