import { useState } from "react";
import { API } from "../api";

function FileUpload() {
  const [file, setFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle upload
  const handleUpload = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    API.post("/admin/upload-emails", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      alert("File uploaded successfully");
      
    })
    .catch((err) => {
      
      alert("Upload failed");
    });
  };

  return (
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div className="max-w-sm w-full"> {/* 'sm' makes it more compact */}
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      
      {/* Header */}
      <div className="bg-blue-950 py-4 text-center">
        <h3 className="text-lg font-bold text-white tracking-tight">Upload File</h3>
        
      </div>

      <div className="p-6">
        {/* Modern File Input Area */}
        <div className="relative group">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 text-slate-400 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-xs font-medium text-slate-500">
                {file ? "Change file" : "Click to browse"}
              </p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileChange} 
            />
          </label>
        </div>

        {/* Selected File Feedback */}
        <div className="h-10 mt-3 flex items-center justify-center">
          {file ? (
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-[11px] font-semibold text-green-700 truncate max-w-50">
                {file.name}
              </p>
            </div>
          ) : (
            <p className="text-[11px] text-slate-400">Supported formats: xlsx</p>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!file}
          className={`w-full mt-4 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-md 
            ${file 
              ? "bg-blue-950 hover:bg-slate-800 text-white transform hover:-translate-y-0.5 active:scale-95" 
              : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span>Send Registration link</span>
        </button>
      </div>     
    </div>
  </div>
</div>
  );
}

export default FileUpload;