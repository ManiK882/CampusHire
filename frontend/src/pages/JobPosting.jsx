import { useState } from "react";
import { API } from "../api";

function JobPost() {
    const [formData, setFormData] = useState({
        company: "",
        role: "",
        ctc: "",
        course: [],
        year: "",
        formLink: "",
        eligibility: []
    });

    const branches = [
        "CSE", "ETC", "EEE", "EE","CE","MME","PE","ME","IT"
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleBranchChange = (branch) => {
        if (formData.eligibility.includes(branch)) {
            setFormData({
                ...formData,
                eligibility: formData.eligibility.filter(b => b !== branch)
            });
        } else {
            setFormData({
                ...formData,
                eligibility: [...formData.eligibility, branch]
            });
        }
    };
    const courses = ["MCA", "BTECH", "MTECH", "MSC"];

    const handleCourseChange = (course) => {
        if (formData.course.includes(course)) {
            setFormData({
                ...formData,
                course: formData.course.filter(c => c !== course)
            });
        } else {
            setFormData({
                ...formData,
                course: [...formData.course, course]
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.company || !formData.role || !formData.ctc || !formData.year || !formData.formLink || formData.course.length === 0 || formData.eligibility.length === 0) {
            alert("Please fill all fields");
            return;
        }

        const payload = {
            companyName: formData.company,
            role: formData.role,
            ctc: formData.ctc,
            year: formData.year,
            course: formData.course,
            formLink: formData.formLink, // you can add input later
            eligibleBranches: formData.eligibility
        };

        try {
            const res = await API.post(
                "/jobs/create",
                payload
            );

            alert(res.data.message);
            setFormData({
                company: "",
                role: "",
                ctc: "",
                course: [],
                year: "",
                formLink: "",
                eligibility: []
            });

        } catch (err) {
            alert(err.response?.data?.message ||"Error posting job");
        }
    };
    return (
        
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
  <div className="max-w-xl w-full">
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      
      {/* Header */}
      <div className="bg-blue-950 py-4 text-center">
        <h3 className="text-xl font-bold text-white tracking-tight">Post New Opportunity</h3>
        
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Company & Role Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 text-left w-full">Company Name</label>
              <input
                type="text"
                name="company"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 outline-none transition-all"
                placeholder="e.g. Google"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 text-left w-full">Job Role</label>
              <input
                type="text"
                name="role"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 outline-none transition-all"
                placeholder="e.g. SDE-1"
                value={formData.role}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* CTC & Year Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 text-left w-full">CTC (LPA)</label>
              <input
                type="number"
                name="ctc"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 outline-none"
                value={formData.ctc}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 text-left w-full">Target Year</label>
              <input
                type="number"
                name="year"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 outline-none"
                value={formData.year}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Application Link */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 text-left w-full">Application Link</label>
            <input
              type="text"
              name="formLink"
              value={formData.formLink}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 outline-none"
              placeholder="https://careers.company.com/..."
              onChange={handleChange}
            />
          </div>

          {/* Course Selection */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 text-left w-full">Eligible Courses</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {courses.map((course, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer p-2 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#1e293b] border-gray-300 rounded focus:ring-slate-500"
                    checked={formData.course.includes(course)}
                    onChange={() => handleCourseChange(course)}
                  />
                  <span className="text-[11px] font-semibold text-slate-600">{course}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Eligibility/Branches Selection */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 text-left w-full">Eligible Branches</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {branches.map((branch, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer p-2 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#1e293b] border-gray-300 rounded focus:ring-slate-500"
                    checked={formData.eligibility.includes(branch)}
                    onChange={() => handleBranchChange(branch)}
                  />
                  <span className="text-[11px] font-semibold text-slate-600">{branch}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 py-3 bg-blue-950 hover:bg-slate-800 text-white font-bold rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>Publish Job Post</span>
          </button>

        </form>
      </div>
    </div>
  </div>
</div>
    );
}

export default JobPost;