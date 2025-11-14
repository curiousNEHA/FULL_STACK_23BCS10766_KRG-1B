import React from "react";
import "./style.css"; 
import { useNavigate } from 'react-router-dom';
import {useState, useEffect } from "react";

import axios from "axios";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Swal from "sweetalert2";
import { useUser } from "@clerk/clerk-react"; 
const Heroine = () => {
      const navigate = useNavigate();
  const { user } = useUser(); // Get logged-in user

  const [userApplications, setUserApplications] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
   
useEffect(() => {
  if (!user || !user.id) return;

  const fetchUncelebrated = async () => {
    const celebrated = JSON.parse(localStorage.getItem("celebratedApps")) || [];

    const res = await axios.get(
      `http://localhost:5000/api/applications/user/${user.id}/uncelebrated`,
      { params: { excludeIds: celebrated } }
    );

    const newAccepted = res.data.applications || [];
    if (newAccepted.length === 0) return; // nothing new to celebrate

    const jobNames = newAccepted.map(job => job.jobId?.title || "a job").join(", ");

    Swal.fire({
      title: "🎉 Congratulations!",
      html: `You've been <b>accepted</b> for ${jobNames}!`,
      icon: "success",
      confirmButtonText: "Yay!",
      timer: 5000,
      timerProgressBar: true,
    });

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);

    // Save celebrated IDs
    const newCelebratedIds = [...celebrated, ...newAccepted.map(job => job._id)];
    localStorage.setItem("celebratedApps", JSON.stringify(newCelebratedIds));
  };

  fetchUncelebrated();
}, [user]); // only run when user changes



  function jobTrack() {

    navigate('/track');
    
    
  }

  function jobFinder() {

    navigate('/finding-job');
    
    
  }
   function resumeAnalyze() {

    navigate('/analyze-resume');
    
    
  }
  

  return (
    <>
    {showConfetti && <Confetti width={width} height={height} />}
      {/* 🔹 Hero Section */}
      <section className="hero">
        <h2 className="hero-title">Everything You Need for Your Career Growth</h2>
        <p className="hero-text">
          Rozgar360 brings together tools to manage your job search efficiently and professionally.
        </p>
      </section>

      {/* 🔹 Feature Cards Section */}
      <section className="card-section">
        
        {/* Card 1: Application Tracking */}
        <div className="card feature-card">
          <h3>Application Tracking</h3>
          <p>
            Keep track of all your job applications in one place. Get reminders
            for deadlines, interviews, and updates automatically.
          </p>
          <button onClick = {jobTrack} className="learn-btn">Learn more →</button>
        </div>

        {/* Card 2: Job Discovery */}
        <div className="card pro-card">
          <h3>Job Discovery</h3>
          <p>
            Find jobs that match your skills and preferences instantly. Access
            personalized recommendations and trending opportunities.
          </p>
          <ul>
            <li>✅ Smart job recommendations</li>
            <li>✅ Real-time job alerts</li>
            <li>✅ Location & role filters</li>
          </ul>
          <button onClick ={jobFinder} className="choose-btn">Explore now</button>
        </div>

        {/* Card 3: Resume Analysis */}
        <div className="card tool-card">
          <h3>Resume Analysis</h3>
          <p>
            Get instant feedback on your resume. Identify strengths, highlight
            missing skills, and increase your chances of selection.
          </p>
          <div className="stats">
            <div>
              <h4>95%</h4>
              <p>Accuracy</p>
            </div>
            <div>
              <h4>3.8K</h4>
              <p>Users Improved</p>
            </div>
          </div>
          <button onClick = {resumeAnalyze} className="choose-btn">Check now</button>
        </div>

      </section>
      <section className="reviews">

<script src="https://elfsightcdn.com/platform.js" async></script>
<div className="elfsight-app-2cb89f53-582f-41bc-826e-d6c418ff86e7"  data-elfsight-app-lazy></div>
      </section>
    </>
  );
};

export default Heroine;
