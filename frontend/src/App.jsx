import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Home";
import StdHome from "./pages/StdHome";
import FileUpload from "./pages/FileUpload";
import JobPosting from "./pages/JobPosting";
import StudentProfile from "./pages/SturdentProfile";
import Jobs from "./pages/Jobs";
import UploadPlaced from"./pages/UploadPlaced";
import LandingPage from "./pages/LandingPage";
function App() {


  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/:token" element={<Register />} />
          <Route path="/adminhome" element={<HomePage />} />
          <Route path="/stdhome" element={<StdHome />} />
          <Route path="/fileupload" element={<FileUpload />} />
          <Route path="/jobposting" element={<JobPosting />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/jobs/:branch" element={<Jobs />} />
          <Route path="/upload-placed" element={<UploadPlaced />} />
        </Routes>
      </Layout>

    </BrowserRouter>
  )
}

export default App
