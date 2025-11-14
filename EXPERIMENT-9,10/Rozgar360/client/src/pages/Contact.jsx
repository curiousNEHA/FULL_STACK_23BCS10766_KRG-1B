import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-6">Contact Us</h2>
          <p className="text-gray-600 mb-8">
            Have a question, suggestion, or feedback? We'd love to hear from you! 
            Reach out to the Rozgar360 team for support, collaboration, or partnership opportunities.
          </p>

          <div className="bg-white shadow-md rounded-xl p-8">
            <p className="text-gray-700 mb-4">
              📧 <b>Email:</b> support@rozgar360.com
            </p>
            <p className="text-gray-700 mb-4">
              📍 <b>Location:</b> New Delhi, India
            </p>
            <p className="text-gray-700">
              💬 <b>Follow Us:</b> Stay connected for the latest job updates and platform news.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
