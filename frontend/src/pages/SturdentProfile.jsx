import { useEffect, useState } from "react";
import { API } from "../api";

function StudentProfile() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    
    API.get("/student/profile",{
      withCredentials:true,
    })
      .then((res) => {
        console.log("res.data.year");
        setStudent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!student) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (

<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6">

  <div className="max-w-lg w-full">

    <div className="bg-white rounded-2xl shadow-md shadow-slate-200/40 overflow-hidden border border-slate-100">

      {/* Header */}
      <div className="bg-blue-950 px-5 py-6 text-center relative">

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" fill="none" viewBox="0 0 400 400">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <rect
              width="100%"
              height="100%"
              fill="url(#grid)"
            />
          </svg>
        </div>

        {/* Avatar */}
        <div className="
          inline-flex
          items-center
          justify-center
          w-14
          h-14
          rounded-full
          bg-white
          text-[#1e293b]
          text-xl
          font-bold
          mb-2
          shadow
        ">
          {student.name?.charAt(0) || "S"}
        </div>

        {/* Heading */}
        <h3 className="
          text-lg
          font-extrabold
          text-white
          tracking-tight
        ">
          Student Profile
        </h3>

        <p className="text-slate-300 text-[11px] mt-1">
          Academic Year {student.finalYear}
        </p>

      </div>

      {/* Content */}
      <div className="p-5">

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          {/* Name */}
          <div className="space-y-1">
            <p className="
              text-[10px]
              font-bold
              text-slate-400
              uppercase
              tracking-wider
            ">
              Full Name
            </p>

            <p className="text-sm font-semibold text-slate-800">
              {student.name}
            </p>
          </div>

          {/* Registration */}
          <div className="space-y-1">
            <p className="
              text-[10px]
              font-bold
              text-slate-400
              uppercase
              tracking-wider
            ">
              Registration No.
            </p>

            <p className="text-sm font-medium text-slate-700">
              {student.registrationNo}
            </p>
          </div>

          {/* Email */}
          <div className="
            md:col-span-2
            border-t
            border-slate-100
            pt-3
            space-y-1
          ">
            <p className="
              text-[10px]
              font-bold
              text-slate-400
              uppercase
              tracking-wider
            ">
              Email Address
            </p>

            <p className="text-sm font-medium text-slate-700 break-all">
              {student.email}
            </p>
          </div>

          {/* Course */}
          <div className="
            border-t
            border-slate-100
            pt-3
            space-y-1
          ">
            <p className="
              text-[10px]
              font-bold
              text-slate-400
              uppercase
              tracking-wider
            ">
              Course
            </p>

            <span className="
              inline-flex
              items-center
              px-2.5
              py-1
              rounded-full
              text-[11px]
              font-medium
              bg-slate-100
              text-[#1e293b]
            ">
              {student.course}
            </span>
          </div>

          {/* Branch */}
          <div className="
            border-t
            border-slate-100
            pt-3
            space-y-1
          ">
            <p className="
              text-[10px]
              font-bold
              text-slate-400
              uppercase
              tracking-wider
            ">
              Branch
            </p>

            <p className="text-sm font-medium text-slate-700">
              {student.branch}
            </p>
          </div>

        </div>

        {/* Button */}
        <button
          onClick={() => window.history.back()}
          className="
            group
            flex
            items-center
            justify-center
            w-full
            py-2.5
            px-4
            bg-blue-950
            hover:bg-slate-800
            text-white
            text-sm
            font-semibold
            rounded-lg
            transition-all
            duration-200
            shadow-sm
          "
        >

          <svg
            className="
              w-4
              h-4
              mr-2
              transition-transform
              group-hover:-translate-x-1
            "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>

          Back to Dashboard

        </button>

      </div>

    </div>

    {/* Footer */}
    <p className="
      text-center
      text-slate-400
      text-[10px]
      mt-4
    ">
      Official Student Record • Placement Management System
    </p>

  </div>

</div>
  );
}

export default StudentProfile;