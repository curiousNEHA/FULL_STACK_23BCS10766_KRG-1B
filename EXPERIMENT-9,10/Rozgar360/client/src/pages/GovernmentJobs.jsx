import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaBriefcase, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';

const GovernmentJobs = () => {
  const { backendUrl } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchGovtJobs = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/govt-jobs`);
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (err) {
        console.error("Error fetching govt jobs:", err);
        setJobs([]);
      }
    };
    fetchGovtJobs();
  }, [backendUrl]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white py-16 px-4 text-center rounded-b-3xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">📰 Latest Government Jobs</h1>
        {/* <p className="text-lg md:text-xl max-w-2xl mx-auto">Explore the newest opportunities in government sectors. Apply quickly and secure your future!</p> */}
      </div>

      {/* Jobs Grid */}
      <div className="container mx-auto my-12 px-4">
        {jobs?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <FaBriefcase /> <span className="font-semibold">{job.source || "Govt Job"}</span>
                  </div>
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-bold text-purple-700 hover:text-purple-900 hover:underline transition"
                  >
                    {job.title} <FaExternalLinkAlt className="inline ml-1 text-sm" />
                  </a>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                    <FaCalendarAlt /> {formatDate(job.date)}
                  </div>
                </div>
                <button
                  onClick={() => window.open(job.link, "_blank")}
                  className="mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-6">
            No jobs found
          </p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default GovernmentJobs;
