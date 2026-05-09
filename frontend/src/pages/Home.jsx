import { useNavigate } from "react-router-dom";
import { API } from '../api.jsx'
function HomePage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout", {}, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div className="max-w-md w-full">
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      
      {/* Compact Header Section */}
      <div className="bg-blue-950 py-6 px-6 text-center">
        <h2 className="text-xl font-bold text-white tracking-tight">Admin Dashboard</h2>
        
      </div>

      <div className="p-6">
        {/* Actions Grid - Makes it look more organized and smaller */}
        <div className="grid grid-cols-1 gap-3">
          
          <button
            onClick={() => navigate("/fileupload")}
            className="flex items-center justify-between w-full px-5 py-3 bg-white border border-gray-200 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-all duration-200 group"
          >
            <span className="text-sm">Register Student</span>
            <svg className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => navigate("/jobposting")}
            className="flex items-center justify-between w-full px-5 py-3 bg-white border border-gray-200 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-all duration-200 group"
          >
            <span className="text-sm">Create Job Post</span>
            <svg className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => navigate("/upload-placed")}
            className="flex items-center justify-between w-full px-5 py-3 bg-white border border-gray-200 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-all duration-200 group"
          >
            <span className="text-sm">Upload Placed Students</span>
            <svg className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default HomePage;