import React,{useRef, useContext,useState,useEffect} from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';
const Hero = () => {
  const navigate = useNavigate();   // ✅ DEFINE navigate
 const {setSearchFilter,setIsSearched} = useContext(AppContext)
const titleRef = useRef(null)
const locationRef = useRef(null)
const [titleSuggestions, setTitleSuggestions] = useState([]);
const [locationSuggestions, setLocationSuggestions] = useState([]);

const [allJobs, setAllJobs] = useState([]); // store all job titles

const onSearch = ()=>{
    setSearchFilter(
        {
            title : titleRef.current.value,
            location : locationRef.current.value
        }
    )
    setIsSearched(true)
    console.log(
        {
            title : titleRef.current.value,
            location : locationRef.current.value
        }
    );
}
useEffect(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest(".suggestion-box")) {
      setTitleSuggestions([]);
      setLocationSuggestions([]);
    }
  };
  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);


useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/jobs'); // 👈 change this to your API
      const data = await res.json();
      setAllJobs(data.jobs || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };
  fetchJobs();
}, []);

const { backendUrl } = useContext(AppContext);
const handleTitleChange = async (e) => {
  const value = e.target.value.trim();
  if (!value) return setTitleSuggestions([]);

  try {
    const res = await fetch(`${backendUrl}/api/jobs/suggest/titles?q=${value}`);
    const data = await res.json();
    setTitleSuggestions(data.slice(0, 5)); // only 5 suggestions
  } catch (err) {
    console.error("Error fetching title suggestions:", err);
  }
};

const handleLocationChange = async (e) => {
  const value = e.target.value.trim();
  if (!value) return setLocationSuggestions([]);

  try {
    const res = await fetch(`${backendUrl}/api/jobs/suggest/locations?q=${value}`);
    const data = await res.json();
    setLocationSuggestions(data.slice(0, 5));
  } catch (err) {
    console.error("Error fetching location suggestions:", err);
  }
};

const handleSuggestionClick = (ref, value, type) => {
  ref.current.value = value;  // put value in input
  if (type === "title") setTitleSuggestions([]);
  else setLocationSuggestions([]);
};

 const handleGovtJobsClick = () => {
    navigate("/government-jobs");
  };


  return (
    <div className='container 2xl:px-20 mx-auto my-10'>
      <div className='bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over 10,000+ jobs to apply</h2>
        <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
        <div className='flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto'>
            <div className='flex flex-col relative w-full suggestion-box'>
  <div className='flex items-center'>
    <img className='h-4 sm:h-5' src={assets.search_icon} alt="" />
    <input
  type="text"
  placeholder="Search for jobs"
  className="max-sm:text-xs p-2 rounded outline-none w-full"
  ref={titleRef}
  onChange={handleTitleChange}
/>

  </div>

{titleSuggestions.length > 0 && (
  <ul className="absolute top-full left-0 w-full bg-white border rounded shadow-md z-10 max-h-48 overflow-y-auto">
    {titleSuggestions.map((title, i) => (
      <li
        key={i}
        onClick={() => handleSuggestionClick(titleRef, title, "title")}
        className="p-2 hover:bg-gray-200 cursor-pointer text-sm"
      >
        {title}
      </li>
    ))}
  </ul>
)}

</div>
<div className='flex flex-col relative w-full suggestion-box'>

    <div className='flex items-center'>
        <img className = 'h-4 sm:h-5' src = {assets.location_icon} alt = ""/>
        <input
            type="text"
            placeholder="Location"
            className="max-sm:text-xs p-2 rounded outline-none w-full"
            ref={locationRef}
            onChange={handleLocationChange}
        />
    </div>

    {locationSuggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border rounded shadow-md z-10 max-h-48 overflow-y-auto">
            {locationSuggestions.map((loc, i) => (
                <li
                    key={i}
                    onClick={() => handleSuggestionClick(locationRef, loc, "location")}
                    className="p-2 hover:bg-gray-200 cursor-pointer text-sm"
                >
                    {loc}
                </li>
            ))}
        </ul>
    )}

</div>

            <button  onClick = {onSearch} className='bg-blue-600 px-6 py-2 rounded text-white m-1'>Search</button>
        </div>
        <div className="mt-6">
          <button
            onClick={handleGovtJobsClick}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-md font-medium shadow-md transition"
          >
            View Latest Government Jobs
          </button>
        </div>

      </div>
      <div className = 'border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex'>
        <div className='flex justify-center gap-10 lg:gap-16 flex-wrap' >
            <p className='font-medium'>Trusted by</p>
            <img className = 'h-6' src={assets.microsoft_logo} alt="" />
            <img className = 'h-6' src={assets.walmart_logo} alt="" />
            <img className = 'h-6' src={assets.accenture_logo}alt="" />
            <img className = 'h-6' src={assets.samsumg_logo} alt="" />
            <img className = 'h-6' src={assets.amazon_logo} alt="" />
            <img className = 'h-6' src={assets.adobe_logo} alt="" />
        </div>
         
      </div>
    </div>
  )
}

export default Hero
