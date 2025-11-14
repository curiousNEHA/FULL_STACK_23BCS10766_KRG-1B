import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Features = () => {
  const features = [
    {
      title: "Unified Job Finder",
      desc: "Explore both Government (Sarkari) and Private job openings in one place. Use advanced filters to find opportunities based on your skills, location, and interests.",
    },
    {
      title: "Smart Application Tracker",
      desc: "Keep track of all your job applications in real-time. Update status as Applied, Interviewed, or Selected, and set reminders to never miss deadlines.",
    },
    {
      title: "AI-Based Resume Analyzer",
      desc: "Upload your resume and get instant feedback on missing skills and keywords using AI and ML-based text matching algorithms.",
    },
    {
      title: "Admin Dashboard",
      desc: "Admins can monitor and manage job listings, remove duplicates or spam, and generate reports for overall platform performance.",
    },
    {
      title: "Secure Authentication",
      desc: "Role-based authentication ensures data privacy and security with encrypted passwords, JWT tokens, and access controls.",
    },
    {
      title: "Personalized Dashboard",
      desc: "Get job recommendations, analysis reports, and alerts tailored to your profile and search history.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-10">Key Features of Rozgar360</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-blue-600 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Features;
