import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../api";

function Jobs() {
  const { branch } = useParams();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get(`/jobs/branch/${branch}`, {
          withCredentials: true,
        });

        setJobs(res.data.jobs);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobs();
  }, [branch]);

  return (
   
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-extrabold text-[#1e293b] tracking-tight">
            Companies Lists
          </h3>
          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
            <span className="text-[10px] font-bold text-[#1e293b] uppercase tracking-widest">
              Branch: {branch}
            </span>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length === 0 ? (
            <div className="col-span-full bg-white p-12 rounded-2xl shadow-sm border border-dashed border-gray-300 text-center">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-slate-500 font-medium">No jobs available for this branch at the moment.</p>
            </div>
          ) : (
            jobs.map((job, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
              >
                {/* Top Navy Accent Strip */}
                <div className="h-1.5 bg-blue-950 w-full"></div>

                <div className="p-6 grow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <svg className="w-6 h-6 text-[#1e293b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded">
                      Batch {job.year}
                    </span>
                  </div>

                  <h5 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-[#1e293b] transition-colors">
                    {job.companyName}
                  </h5>

                  <div className="space-y-2 mt-4">
                    <div className="flex items-center text-sm text-slate-600">
                      <span className="font-bold text-[10px] uppercase text-slate-400 w-16">Role</span>
                      <span className="font-medium">{job.role}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <span className="font-bold text-[10px] uppercase text-slate-400 w-16">ctc</span>
                      <span className="font-medium">{job.ctc}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                  <button className="w-full text-center text-xs font-bold text-[#1e293b] uppercase tracking-widest hover:underline">
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;