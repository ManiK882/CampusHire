import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../api";
import { jwtDecode } from "jwt-decode";

function Register() {
  const { token } = useParams();
  
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    registrationNo: "",
    course: "",
    branch: "",
    finalYear: "",
    password: ""
  });

  //  Decode token on load
  useEffect(() => {
    try {
      const decoded = jwtDecode(token);

      if (!decoded.email) {
        throw new Error("Invalid token");
      }

      setEmail(decoded.email);
      setLoading(false);

    } catch (error) {
      alert("Invalid or expired link");
      navigate("/"); // redirect to login
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let key in formData) {
      if (!formData[key]) {
        alert("Please fill all fields");
        return;
      }
    }

    try {
      const res = await API.post("/auth/register", {
        ...formData,
        email,
        token
      });

      alert(res.data.message);

      //  redirect after success
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  //  Loading UI
  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    
<div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8"> {/* Reduced outer padding */}
  <div className="max-w-md mx-auto">
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      {/* Header Section - Slimmer padding */}
      <div className="bg-blue-950 py-4 text-center"> 
        <h3 className="text-xl font-bold text-white">Create Account</h3>
       
      </div>

      <div className="p-6"> {/* Reduced inner padding from p-8 to p-6 */}
        <form onSubmit={handleSubmit} className="space-y-3.5"> {/* Reduced spacing from space-y-5 */}
          
          {/* Email (Readonly) */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 text-left w-full">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 text-gray-500 rounded-lg text-sm cursor-not-allowed focus:outline-none"
              value={email}
              readOnly
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 text-left w-full">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all outline-none"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Two-column grid for Reg No & Year */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 text-left w-full">
                Registration No.
              </label>
              <input
                type="text"
                name="registrationNo"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 outline-none"
                placeholder="REG123"
                value={formData.registrationNo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 text-left w-full">
                Final Year
              </label>
              <input
                type="number"
                name="finalYear"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 outline-none"
                placeholder="2026"
                value={formData.finalYear}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Course & Branch Selection */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 text-left w-full">
                Course
              </label>
              <select
                name="course"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-slate-500 outline-none"
                value={formData.course}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="MCA">MCA</option>
                <option value="BTECH">BTECH</option>
                <option value="MTECH">MTECH</option>
                <option value="MSC">MSC</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 text-left w-full">
                Branch
              </label>
              <select
                name="branch"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-slate-500 outline-none"
                value={formData.branch}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ME">ME</option>
                <option value="PE">PE</option>
                <option value="MME">MME</option>
                <option value="CE">CE</option>
                <option value="EEE">EEE</option>
                <option value="EE">EE</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 text-left w-full">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button - Slightly smaller padding */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-950 hover:bg-[#334155] text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 mt-2"
          >
            Complete Registration
          </button>
          
        </form>
      </div>
    </div>
  </div>
</div>
  );
}

export default Register;