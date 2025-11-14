import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import ApplyJob from "../pages/ApplyJob";
import { useNavigate } from "react-router-dom";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
const ApplicationTracker = () => {
  const { user } = useUser();

if (!user || !user.id) return;

const [userApplications, setUserApplications] = useState([]);


  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();



  const [stats, setStats] = useState({
    bookmarked: 0,
    applying: 0,
    applied: 0,
    interviewing: 0,
    rejected: 0,
    accepted: 0,
  });

 

  const cards = [
    { title: "Bookmarked", count: stats.bookmarked, color: "bg-yellow-100 text-yellow-700" },

    { title: "Applied", count: stats.applied, color: "bg-sky-100 text-sky-700" },
  
    { title: "Rejected", count: stats.rejected, color: "bg-purple-100 text-purple-700" },
    { title: "Accepted", count: stats.accepted, color: "bg-green-100 text-green-700" },
  ];
useEffect(() => {
  const fetchApplications = async () => {
    if (!user) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/applications/user/${user.id}`
      );
      setUserApplications(res.data.applications); // make sure backend returns { applications: [...] }
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  fetchApplications();
}, [user]);
useEffect(() => {
  const updatedStats = {
       bookmarked: userApplications.filter(a => a.bookmarked).length,
  
    applied: userApplications.filter(a => a.status === "Pending").length,
   
    rejected: userApplications.filter(a => a.status === "Rejected").length,
    accepted: userApplications.filter(a => a.status === "Accepted").length,
  };
  setStats(updatedStats);
}, [userApplications]);



  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col">
         
          <ul className="flex flex-col gap-2 mt-4">
  {["Job", "People", "Company"].map((item) => (
    <li key={item}>
      <button
      onClick={() => {
  setActiveTab(item); // add this line
  if (item === "Job") navigate('/applications');
  else if (item === "People") navigate('/add-people');
  else navigate('/add-company');
}}

        className={`w-full text-left px-6 py-3 text-gray-700 font-medium rounded-r-full transition-all ${
          activeTab === item
            ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600"
            : "hover:bg-gray-100"
        }`}
      >
        {item}
      </button>
    </li>
  ))}
</ul>

        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
                    {activeTab === "" && (
                      <>
              {/* Job Status Cards */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">

                {cards.map((card, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl shadow-md p-6 text-center transition-all hover:scale-105 hover:shadow-lg ${card.color}`}
                  >
                    <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                    <p className="text-4xl font-bold">{card.count}</p>
                  </div>
                ))}
              </div>
                {/* Analytics Dashboard */}
      <div className="mt-10">
        <AnalyticsDashboard applications={userApplications} />
      </div>
            </>

          )}
          


          {activeTab === "People" && (
            <div className="text-center text-gray-600 mt-20">
              <p>🔍 People section coming soon...</p>
            </div>
          )}

          {activeTab === "Company" && (
            <div className="text-center text-gray-600 mt-20">
              <p>🏢 Company section coming soon...</p>
            </div>
          )}
        </main>
      </div>
      {/* Analytics Dashboard */}


    
      <Footer />
    </>
  );
};

export default ApplicationTracker;
