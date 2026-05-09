import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();

    const branches =[
        {
            name:"CSE",
            fullName: "Computer Science & Engineering",
            icon: "💻"
        },
        {
            name: "ETC",
            fullName: "Electronics & Telecommunication",
            icon: "📡"
        },
        {
            name: "EEE",
            fullName: "Electrical & Electronics Engineering",
            icon: "⚡"
        },
         {
            name: "EE",
            fullName: "Electrical Engineering",
            icon: "🔌"
        },
        {
            name: "ME",
            fullName: "Mechanical Engineering",
            icon: "⚙️"
        },
        {
            name: "CE",
            fullName: "Civil Engineering",
            icon: "🏗️"
        },
        {
          name:"IT",
          fullName:"Information Technology",
          icon:"🖥️"
        },
        {
          name:"MME",
          fullName:"Metallurgical and Materials Engineering",
          icon:"🏭"
        },
        {
          name:"PE",
          fullName:"Production Engineering",
          icon:"🛠️"
        }
    ]
    const handleBranchClick = (branch) => {
        navigate(`/jobs/${branch}`);
    };

    return (
<div className="min-h-screen bg-gray-100">

  {/* Hero Section */}
  <div className="bg-linear-to-r from-blue-950 to-slate-900 text-white py-20 shadow-2xl">

    <div className="max-w-7xl mx-auto px-6 text-center">

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide">
        VSSUT
      </h1>

      <p className="text-2xl md:text-3xl mt-5 text-gray-200">
        Placement Portal
      </p>

      <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
        Explore placement opportunities, view company openings.
      </p>

    </div>

  </div>

  {/* Branch Section */}
  <div className="max-w-7xl mx-auto px-6 py-16">

    {/* Responsive Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

      {branches.map((branch, index) => (

        <div
          key={index}
          onClick={() => handleBranchClick(branch.name)}
          className="
            group
            bg-white
            rounded-3xl
            p-8
            border
            border-gray-200
            shadow-md
            hover:shadow-2xl
            hover:-translate-y-2
            transition-all
            duration-300
            cursor-pointer
          "
        >

          {/* Icon */}
          <div
            className="
              flex
              justify-center
              items-center
              text-6xl
              mb-6
              text-blue-950
              group-hover:scale-110
              transition-transform
              duration-300
            "
          >
            {branch.icon}
          </div>

          {/* Branch Name */}
          <h3 className="text-2xl font-bold text-center text-slate-800">
            {branch.name}
          </h3>

          {/* Full Name */}
          <p className="text-center text-gray-500 mt-3 leading-relaxed text-sm">
            {branch.fullName}
          </p>

          {/* Small Bottom Accent */}
          <div className="mt-6 flex justify-center">
            <div className="
              h-1
              w-16
              rounded-full
              bg-blue-950
              opacity-70
              group-hover:w-24
              transition-all
              duration-300
            "></div>
          </div>

        </div>

      ))}

    </div>

  </div>

</div>
    );
}
