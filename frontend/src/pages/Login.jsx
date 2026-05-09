import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    role:"",
    password: "",
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    
    if (!formData.email || !formData.password|| !formData.role) {
      alert("Please fill all fields");
      return;
    }
    
    try {
    const res = await API.post("/auth/login", formData, {
      withCredentials: true,
    });

    const user = res.data.user;

    alert(res.data.message);

   
   if (user.role === "admin") {
   window.location.href = "/adminhome";
} else {
   window.location.href = "/stdhome";
}

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }

  };

  return (
          
<div className="min-h-screen bg-white flex items-center justify-center px-4">

  {/* Login Container */}
  <div
    className="
      w-full
      max-w-sm
      bg-blue-950
      rounded-2xl
      shadow-2xl
      px-7
      py-8
      border
      border-gray-700
    "
  >

    {/* Heading */}
    <div className="mb-8 text-center">

      <h2 className="
        text-3xl
        font-bold
        text-white
        tracking-wide
      ">
        Login
      </h2>

      <p className="
        text-gray-300
        mt-2
        text-sm
      ">
        Access your Placement Portal
      </p>

    </div>

    <form onSubmit={handleSubmit}>

      {/* Role Selection */}
      <div className="mb-5">

        <div className="flex justify-center items-center gap-8">

  {/* Student */}
  <label
    className="
      flex
      items-center
      gap-2
      text-gray-200
      text-sm
      cursor-pointer
    "
  >
    <input
      type="radio"
      name="role"
      value="student"
      onChange={handleChange}
      className="w-4 h-4 accent-white"
    />
    Student
  </label>

  {/* Admin */}
  <label
    className="
      flex
      items-center
      gap-2
      text-gray-200
      text-sm
      cursor-pointer
    "
  >
    <input
      type="radio"
      name="role"
      value="admin"
      onChange={handleChange}
      className="w-4 h-4 accent-white"
    />
    Admin
  </label>

</div>

      </div>

      {/* Email */}
      <div className="mb-4">

        <label className="
    block
    w-full
    text-left
    text-gray-200
    text-sm
    font-medium
    mb-2
">
  Email
</label>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          className="
            w-full
            px-3
            py-2.5
            rounded-lg
            bg-white/10
            border
            border-gray-500
            text-white
            text-sm
            placeholder-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-gray-300
            transition-all
            duration-300
          "
        />

      </div>

      {/* Password */}
      <div className="mb-6">

        <label className="
          block
          w-full
          text-gray-200
          text-sm
          font-medium
          mb-2
          text-left
        ">
          Password
</label>

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          className="
            w-full
            px-3
            py-2.5
            rounded-lg
            bg-white/10
            border
            border-gray-500
            text-white
            text-sm
            placeholder-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-gray-300
            transition-all
            duration-300
          "
        />

      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="
          w-full
          bg-white
          text-blue-950
          py-2.5
          rounded-lg
          font-semibold
          text-sm
          shadow-md
          hover:bg-gray-200
          transition-all
          duration-300
        "
      >
        Login
      </button>

    </form>

  </div>

</div>
  );
}

export default Login;