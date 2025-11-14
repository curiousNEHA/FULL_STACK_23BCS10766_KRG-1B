import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

const ResultPage = () => {
  const { state } = useLocation();
  const { analysisData } = state || {};
  const navigate = useNavigate();

  if (!analysisData) {
    navigate("/");
    return null;
  }

  const pieData = [
    { name: "Matched", value: analysisData.score },
    { name: "Unmatched", value: 100 - analysisData.score },
  ];

  const COLORS = ["#16a34a", "#f59e0b"]; // Green: matched, Yellow: unmatched

  // Function to provide score-based overall advice
  const getOverallAdvice = (score) => {
    if (score >= 80) return "✅ Excellent match! Focus on quantifying achievements in your resume.";
    if (score >= 50) return "⚠️ Moderate match. Add missing skills and highlight your relevant experience.";
    return "❌ Low match. Consider rewriting your resume to better align with job keywords.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 text-white p-8 flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold mb-8 text-center">📊 Resume Analysis Report</h1>

      {/* Score & Pie Chart Section */}
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-5xl flex flex-col md:flex-row items-center justify-around gap-8">
        <div style={{ width: 180, height: 180 }}>
          <CircularProgressbar
            value={analysisData.score}
            text={`${analysisData.score}%`}
            styles={buildStyles({
              textColor: "#1e40af",
              pathColor: analysisData.score > 70 ? "#16a34a" : "#f59e0b",
              trailColor: "#c7d2fe",
              textSize: "24px",
            })}
          />
        </div>
        <div style={{ width: 200, height: 200 }}>
          <PieChart width={200} height={200}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              fill="#8884d8"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-semibold mb-2">ATS Score</h2>
          <p className="text-lg text-gray-200">{analysisData.analysis}</p>
          <p className="mt-2 italic text-yellow-200">{getOverallAdvice(analysisData.score)}</p>
        </div>
      </div>

      {/* Skill Comparison Chart */}
      {analysisData.skillComparison && analysisData.skillComparison.length > 0 && (
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl w-full max-w-5xl">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-300 text-center">Skill Match Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analysisData.skillComparison} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="skill" stroke="#ddd" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="resume" fill="#16a34a" name="Your Resume" />
              <Bar dataKey="job" fill="#60a5fa" name="Job Requirement" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Missing Keywords & AI Suggestions */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl w-full max-w-5xl mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-300">AI Suggestions & Improvements</h2>

        {analysisData.missing && analysisData.missing.length > 0 ? (
          <ul className="list-disc list-inside text-gray-200 space-y-2">
            {analysisData.missing.map((kw, idx) => (
              <li key={idx}>
                ❌ <span className="font-bold text-red-400">{kw}</span> is missing. 
                Suggestion: Add a line like <span className="italic text-green-300">"Worked on {kw} in [Project/Job/Internship]"</span>.
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-300 font-semibold">✅ Your resume is well-aligned with the job description.</p>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
