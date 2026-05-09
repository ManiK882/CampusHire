import { useNavigate } from "react-router-dom";
import { API } from "../api";

function StudentHome() {
  const navigate = useNavigate();

 
  const handleProfile = () => {
    navigate("/student-profile");
  };

  return (
   
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
  <div className="max-w-md w-full">
    {/* Main Card */}
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
      
      {/* Decorative Top Section */}
      <div className="h-24 bg-blue-950 flex items-center justify-center">
        <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
          {/* Simple User Icon Placeholder */}
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>

      <div className="p-8 pt-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Student Home
          </h3>
          <p className="text-slate-500 text-sm mt-1">Welcome back to your dashboard</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleProfile}
            className="group relative w-full flex items-center justify-center px-6 py-3.5 bg-blue-950 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            <span>View My Profile</span>
            <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default StudentHome;