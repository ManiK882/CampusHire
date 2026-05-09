import { useEffect, useState } from "react";
import { API } from "../api";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const res = await API.get("/auth/check", {
        withCredentials: true,
      });

      setIsLoggedIn(res.data.isAuthenticated);
    } catch {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    await API.post("/auth/logout", {}, { withCredentials: true });
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-blue-950 shadow-lg px-6 py-4">

  <div className="flex items-center justify-between">

    {/* Logo / Title */}
    <h4
      className="
        text-white
        text-2xl
        font-bold
        tracking-wide
        cursor-pointer
        hover:text-gray-200
        transition-colors
        duration-300
      "
      onClick={() => navigate("/")}
    >
      Placement Portal
    </h4>

    {/* Button Section */}
    <div>
      {!isLoggedIn ? (

        <button
          onClick={() => navigate("/login")}
          className="
            bg-white
            text-blue-950
            px-5
            py-2
            rounded-xl
            font-semibold
            shadow-md
            hover:bg-gray-200
            hover:shadow-xl
            transition-all
            duration-300
          "
        >
          Login
        </button>

      ) : (

        <button
          onClick={handleLogout}
          className="
            bg-gray-200
            text-blue-950
            px-5
            py-2
            rounded-xl
            font-semibold
            shadow-md
            hover:bg-white
            hover:shadow-xl
            transition-all
            duration-300
          "
        >
          Logout
        </button>

      )}
    </div>

  </div>

</nav>
  );
}

export default Navbar;