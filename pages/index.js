// import ResearchForm from "@/components/ResearchForm";
// // import FirstShow from "@/components/FirstShow";

// export default function Home() {
//     return (
//         <div className="min-h-screen p-8">
//             <h1 className="text-2xl font-bold">Research Hypothesis Generator</h1>
//             <ResearchForm />
//             {/* <FirstShow /> */}
//         </div>
//     );
// }



//由于生成树的部分是在submit处理的，所以当切换页面的时候就不能生成右侧的树了，这部分要解决
import { useState } from "react";
import FormPanel from "../components/FormPanel";
import CanvasWrapper from "../components/CanvasWrapper";
import TreeCanvas from "../components/TreeCanvas"; // 默认页显示树图
import { handleSubmit as submitHandler } from "../utils/handleSubmit";
import { useAppContext } from "../context/AppContext";
import UserGuide from "../components/UserGuide"; 

export default function HomePage() {
    
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const {
      question, setQuestion,
      survey, setSurvey,apiType, setApiType,hpy1Id, setHpy1Id,setHpy2Id,
      apiKey, setApiKey,modelName, setModelName,baseUrl, setBaseUrl,
      file, setFile,setOutput,setTaskId,treeFileName, setTreeFileName,
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
                <TreeCanvas />
            </CanvasWrapper>
            <UserGuide />
        </div>
    );
}
