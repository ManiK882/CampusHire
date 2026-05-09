import { useState } from "react";
import { API } from "../api";

function UploadPlaced() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Select file first");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {
      const res = await API.post(
        "/admin/upload-placed",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);

    } catch (err) {
      console.log(err);

      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div className="max-w-sm w-full"> {/* Compact width */}
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      
      {/* Header */}
      <div className="bg-blue-950 py-4 text-center">
        <h3 className="text-lg font-bold text-white tracking-tight">Placement Data</h3>
      </div>

      <div className="p-6">
        {/* Modern File Drop/Click Zone */}
        <div className="relative group">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 text-slate-400 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-xs font-medium text-slate-500 text-center px-4">
                {file ? "Change selected file" : "Select student placement file"}
              </p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              onChange={(e) => setFile(e.target.files[0])} 
            />
          </label>
        </div>

        {/* Selected File Feedback */}
        <div className="h-10 mt-3 flex items-center justify-center">
          {file ? (
            <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
              <div className="w-2 h-2 bg-blue-950 rounded-full animate-pulse"></div>
              <p className="text-[11px] font-semibold text-slate-700 truncate max-w-55">
                {file.name}
              </p>
            </div>
          ) : (
            <p className="text-[11px] text-slate-400 italic">Expected format: .xlsx </p>
          )}
        </div>

        {/* Action Button */}
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
          <span>Upload Students</span>
        </button>
      </div>
      
    </div>
  </div>
</div>
  );
}

export default UploadPlaced;