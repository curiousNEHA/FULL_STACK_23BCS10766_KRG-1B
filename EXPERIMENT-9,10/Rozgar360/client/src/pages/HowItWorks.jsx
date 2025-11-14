import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HowItWorks = () => {
  const steps = [
    {
      step: "1️⃣ Register and Create Your Profile",
      desc: "Sign up easily and set up your personalized dashboard to manage your job search activities.",
    },
    {
      step: "2️⃣ Search and Discover Jobs",
      desc: "Browse through thousands of Government and Private jobs, using smart filters and recommendations.",
    },
    {
      step: "3️⃣ Apply and Track Progress",
      desc: "Apply directly from the platform and track your job applications with real-time updates and reminders.",
    },
    {
      step: "4️⃣ Analyze Your Resume",
      desc: "Use our AI Resume Analyzer to match your profile with job descriptions and identify skill gaps.",
    },
    {
      step: "5️⃣ Stay Organized and Improve Continuously",
      desc: "Manage everything from one dashboard — job applications, resume scores, and interview reminders.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-10">How Rozgar360 Works</h2>
          <div className="space-y-8">
            {steps.map((s, i) => (
              <div key={i} className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{s.step}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HowItWorks;
