import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-6">About Rozgar360</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            <b>Rozgar360</b> is a next-generation career platform designed to simplify job searching for Indian students and professionals. 
            It combines <b>Government jobs</b>, <b>Private opportunities</b>, and <b>AI-powered Resume Analysis</b> into one smart, unified system.
          </p>
          <p className="text-gray-500 leading-relaxed">
            Our mission is to bridge the gap between aspirants and recruiters by offering 
            a centralized space to <b>find jobs, track applications, and analyze resumes</b>. 
            Rozgar360 empowers users to stay organized and increase their selection chances — all from a single dashboard.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
