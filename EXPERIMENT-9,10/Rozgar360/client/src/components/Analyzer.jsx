import React, { useState } from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const ResumeAnalyzer = () => {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [skillData, setSkillData] = useState([]);
const navigate = useNavigate();


  const handleFileChange = (e) => setResume(e.target.files[0]);
  const handleJobDescChange = (e) => setJobDesc(e.target.value);

const handleAnalyze = async () => {
  if (!resume || !jobDesc) return alert("Please upload resume & enter job description.");

  setLoading(true);
  const formData = new FormData();
  formData.append("resume", resume);
  formData.append("jobDesc", jobDesc);

  try {
    const response = await axios.post("http://localhost:7000/analyze", formData, {

      headers: { "Content-Type": "multipart/form-data" },
    });
    const data = response.data;
setResult({
  score: data.score,
  analysis: data.analysis,
  missing: data.missing
});
setSkillData(data.skillComparison || []);

    // ✅ Navigate to result page with backend response
    navigate("/analyze/result", { state: { analysisData: response.data } });
  } catch (error) {
    console.error(error);
    alert("Error analyzing resume");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
    <Navbar/>
<div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 p-6">

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white shadow-lg p-10 rounded-2xl max-w-lg w-full text-center border border-gray-200"

  >

<h2 className="text-3xl font-bold mb-4 text-indigo-700">📄 Resume Analyzer</h2>
<p className="text-sm mb-6 text-gray-600">
          Upload your resume and paste a job description to see how well you match!
        </p>

        <div className="flex flex-col gap-4 mb-6">
          <input
            type="file"
            onChange={handleFileChange}
           className="border border-gray-300 bg-white p-2 rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"

          />
          <textarea
            placeholder="Paste Job Description Here..."
            value={jobDesc}
            onChange={handleJobDescChange}
            rows="4"
           className="border border-gray-300 bg-white p-2 rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"

          />
          <button
            onClick={handleAnalyze}
            disabled={loading}
           className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all"

          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        {loading && (
          <div className="mt-4 text-lg font-semibold text-indigo-300 animate-pulse">
            🔍 AI is analyzing your resume...
          </div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white/10 p-6 rounded-lg shadow-lg"
          >
        <h3 className="text-xl font-semibold text-indigo-700 mb-3">Analysis Result</h3>


            <div className="flex justify-center mb-4">
              <div style={{ width: 120 }}>
               <CircularProgressbar
  value={result.score}
  text={`${result.score}%`}
  styles={buildStyles({
    textColor: "#1e3a8a",      // dark blue
    pathColor: result.score > 70 ? "#16a34a" : "#f59e0b", // green if high, yellow if low
    trailColor: "#d1d5db",
  })}
/>

              </div>
            </div>
            {skillData.length > 0 && (
  <div className="bg-white/10 p-4 rounded-lg mb-4">
   

    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={skillData}>
        <XAxis dataKey="skill" stroke="#ddd" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="resume" fill="#4ade80" name="Resume" />
        <Bar dataKey="job" fill="#60a5fa" name="Job Requirement" />
      </BarChart>
    </ResponsiveContainer>
  </div>
)}


            <p className="text-gray-200 mb-2">{result.analysis}</p>
            {result.missing && result.missing.length > 0 && (
              <div className="text-left mt-3">
             <h4 className="font-bold text-indigo-700">Missing Keywords:</h4>
              <ul className="list-disc list-inside text-gray-700">
                  {result.missing.map((k, i) => (
                    <li key={i}>{k}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
    <Footer />
    </>
  );
};

export default ResumeAnalyzer;
