// // components/FormPanel.js
// //将左侧表单提取为组件 
// import React from "react";
// import { TextField, Button, CircularProgress, LinearProgress } from "@mui/material";

// export default function FormPanel({ question, setQuestion, survey, setSurvey, apiKey, setApiKey, file, setFile, handleSubmit, loading, progress }) {
//     return (
//         <div className="w-1/3 p-6 shadow-xl bg-white rounded-xl">
//             <h2 className="text-2xl font-semibold mb-4">💡 Research Question</h2>
//             <TextField label="Enter your question" value={question} onChange={(e) => setQuestion(e.target.value)} fullWidth className="mb-4" />
//             <TextField label="Background Survey" value={survey} onChange={(e) => setSurvey(e.target.value)} fullWidth className="mb-4" />
//             {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4" /> */}
//             <div className="mb-4">
//                 <input
//                     id="file-upload"
//                     type="file"
//                     accept=".pdf,.txt,.csv"
//                     style={{ display: "none" }}
//                     onChange={(e) => setFile(e.target.files[0])}
//                 />
//                 <label htmlFor="file-upload">
//                     <Button variant="outlined" component="span" fullWidth>
//                         {file ? `📎 ${file.name}` : "Upload File"}
//                     </Button>
//                 </label>
//             </div>

//             <TextField label="API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} fullWidth className="mb-4" />
//             <Button variant="contained" onClick={handleSubmit} disabled={loading} className="w-full">
//                 {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
//             </Button>
//             {loading && <LinearProgress variant="determinate" value={progress} className="mt-4" />}
//         </div>
//     );
// }


import React from "react";
import {
  TextField, Button, CircularProgress, LinearProgress,MenuItem, FormControl, InputLabel, Select,
  IconButton, List, ListItem, ListItemText, Typography, Divider
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function FormPanel({
  question, setQuestion,
  survey, setSurvey,
  apiKey, setApiKey,
  modelName, setModelName,
  baseUrl, setBaseUrl,
  apiType, setApiType,
  file, setFile,
  handleSubmit, loading, progress
}) {
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };
  const handleRemoveFile = () => {
    setFile(null);
  };
  const validateForm = () => {
    if (!question.trim()) {
      alert("Research Question is required.");
      return false;
    }
    if (!survey.trim()) {
      alert("Background Survey is required.");
      return false;
    }
    if (!apiKey.trim()) {
      alert("API Key is required.");
      return false;
    }
    if (!modelName.trim()) {
      alert("Model Name is required.");
      return false;
    }
    if (!baseUrl.trim()) {
      alert("Base URL is required.");
      return false;
    }
    if (!apiType.trim()) {
      alert("API Type is required.");
      return false;
    }
    if (!file) {
      alert("File upload is required.");
      return false;
    }
    const allowedExtensions = ['.xlsx', '.xls'];
    const fileName = file.name.toLowerCase();
    const isExcel = allowedExtensions.some(ext => fileName.endsWith(ext));

    if (!isExcel) {
      alert("Only .xlsx and .xls files are allowed.");
      return false;
    }
    return true;
  };
  return (
    <div className="w-full md:w-1/3 p-6 bg-white rounded-2xl shadow-lg space-y-6">
      <Typography variant="h5" className="font-semibold">💡 Research Assistant</Typography>
      <div className="space-y-4">
        <TextField
          label="Research Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          fullWidth
        />


        <div>
          <Typography variant="subtitle1">Background Survey</Typography>
          <textarea
            value={survey}
            onChange={(e) => setSurvey(e.target.value)}
            style={{
              width: '100%',
              height: '300px',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              resize: 'none',
              overflowY: 'auto',
              fontSize: '16px',
              boxSizing: 'border-box',
              lineHeight: '1.5',
              fontFamily: 'inherit',
            }}
          />
        </div>



        {/* 文件上传 */}
        <div>
          <input
            id="file-upload"
            type="file"
            accept=".xlsx,.xls"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button
              variant="outlined"
              component="span"
              fullWidth
              startIcon={<UploadFileIcon />}
            >
              {file ? "Replace File" : "Upload File"}
            </Button>
          </label>
        </div>

        {/* 文件信息展示 */}
        {file && (
          <div className="pt-2">
            <List dense>
              <ListItem
                className="bg-gray-100 rounded-lg px-3"
                secondaryAction={
                  <IconButton edge="end" onClick={handleRemoveFile}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <a
                      href={URL.createObjectURL(file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {file.name}
                    </a>
                  }
                  secondary={`${(file.size / 1024).toFixed(2)} KB - ${file.type || 'Unknown type'}`}
                />
              </ListItem>
            </List>
          </div>
        )}

        <Divider />

        <FormControl fullWidth>
          <InputLabel id="api-type-label">API Type</InputLabel>
          <Select
            labelId="api-type-label"
            value={apiType}
            label="API Type"
            onChange={(e) => setApiType(e.target.value)}
          >
            <MenuItem value="openai">OpenAI</MenuItem>
            <MenuItem value="azure">Azure</MenuItem>
            <MenuItem value="Gemini">Gemini</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          fullWidth
        />
        <TextField
          label="Model Name"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Base URL"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          fullWidth
        />

        <div>
          <Button
            variant="contained"
            onClick={() => {
              if (validateForm()) {
                handleSubmit(); // 如果验证通过才调用原始提交函数
              }
            }}
            // onClick={handleSubmit}
            disabled={loading}
            fullWidth
            size="large"
            className="rounded-xl"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
          </Button>
          {loading && <LinearProgress variant="determinate" value={progress} className="mt-2" />}
        </div>
      </div>
    </div>
  );
}




// import React from "react";
// import {
//   TextField, Button, CircularProgress, LinearProgress,
//   IconButton, List, ListItem, ListItemText
// } from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
// import UploadFileIcon from '@mui/icons-material/UploadFile';

// export default function FormPanel({
//   question, setQuestion,
//   survey, setSurvey,
//   apiKey, setApiKey,
//   file, setFile,
//   handleSubmit, loading, progress
// }) {
//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     if (selected) setFile(selected);
//   };

//   const handleRemoveFile = () => {
//     setFile(null);
//   };

//   return (
//     <div className="w-1/3 p-6 shadow-xl bg-white rounded-xl">
//       <h2 className="text-2xl font-semibold mb-4">💡 Research Question</h2>

//       <TextField
//         label="Enter your question"
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//         fullWidth className="mb-4"
//       />

//       <TextField
//         label="Background Survey"
//         value={survey}
//         onChange={(e) => setSurvey(e.target.value)}
//         fullWidth className="mb-4"
//       />

//       {/* 文件上传 */}
//       <div className="mb-4">
//         <input
//           id="file-upload"
//           type="file"
//           accept=".pdf,.txt,.csv"
//           style={{ display: "none" }}
//           onChange={handleFileChange}
//         />
//         <label htmlFor="file-upload">
//           <Button
//             variant="outlined"
//             component="span"
//             fullWidth
//             startIcon={<UploadFileIcon />}
//           >
//             {file ? "Replace File" : "Upload File"}
//           </Button>
//         </label>
//       </div>

//       {/* 文件信息展示 */}
//       {file && (
//         <List dense className="mb-4">
//           <ListItem
//             secondaryAction={
//               <IconButton edge="end" aria-label="delete" onClick={handleRemoveFile}>
//                 <DeleteIcon />
//               </IconButton>
//             }
//           >
//             <ListItemText
//               primary={
//                 <a
//                   href={URL.createObjectURL(file)}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   {file.name}
//                 </a>
//               }
//               secondary={`${(file.size / 1024).toFixed(2)} KB - ${file.type || 'Unknown type'}`}
//             />
//           </ListItem>
//         </List>
//       )}

//       <TextField
//         label="API Key"
//         value={apiKey}
//         onChange={(e) => setApiKey(e.target.value)}
//         fullWidth className="mb-4"
//       />

//       <Button
//         variant="contained"
//         onClick={handleSubmit}
//         disabled={loading}
//         className="w-full"
//       >
//         {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
//       </Button>

//       {loading && <LinearProgress variant="determinate" value={progress} className="mt-4" />}
//     </div>
//   );
// }

// import React from "react";
// import { TextField, Button, CircularProgress, LinearProgress, IconButton, List, ListItem, ListItemText } from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
// import UploadFileIcon from '@mui/icons-material/UploadFile';

// export default function FormPanel({
//   question, setQuestion,
//   survey, setSurvey,
//   apiKey, setApiKey,
//   file=[], setFile,
//   handleSubmit, loading, progress
// }) {
//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
//   };

//   const handleRemoveFile = (index) => {
//     setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="w-1/3 p-6 shadow-xl bg-white rounded-xl">
//       <h2 className="text-2xl font-semibold mb-4">💡 Research Question</h2>
//       <TextField label="Enter your question" value={question} onChange={(e) => setQuestion(e.target.value)} fullWidth className="mb-4" />
//       <TextField label="Background Survey" value={survey} onChange={(e) => setSurvey(e.target.value)} fullWidth className="mb-4" />

//       {/* 文件上传部分 */}
//       <div className="mb-4">
//         <input
//             type="file"
//             multiple   // 👈 允许多选
//             onChange={(e) => handleFileChange(Array.from(e.target.files))}
//             className="mb-4"
//         />
//         <label htmlFor="file-upload">
//           <Button variant="outlined" component="span" fullWidth startIcon={<UploadFileIcon />}>
//             Upload Files
//           </Button>
//         </label>
//       </div>

//       {/* 已选文件列表 */}
//       {files.length > 0 && (
//         <List dense>
//           {files.map((file, index) => (
//             <ListItem
//               key={index}
//               secondaryAction={
//                 <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(index)}>
//                   <DeleteIcon />
//                 </IconButton>
//               }
//             >
//               <ListItemText
//                 primary={
//                   <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
//                     {file.name}
//                   </a>
//                 }
//                 secondary={`${(file.size / 1024).toFixed(2)} KB - ${file.type || 'Unknown Type'}`}
//               />
//             </ListItem>
//           ))}
//         </List>
//       )}

//       <TextField label="API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} fullWidth className="mb-4 mt-4" />
//       <Button variant="contained" onClick={handleSubmit} disabled={loading} className="w-full">
//         {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
//       </Button>
//       {loading && <LinearProgress variant="determinate" value={progress} className="mt-4" />}
//     </div>
//   );
// }

