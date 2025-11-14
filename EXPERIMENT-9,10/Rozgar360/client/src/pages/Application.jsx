import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect,useState,useContext } from 'react'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import {toast} from 'react-toastify'
import {useAuth,useUser} from '@clerk/clerk-react'
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CommentSection from "../components/CommentSection";

const Application = () => {
  const navigate = useNavigate();

  const {user} = useUser()
  const {getToken} = useAuth()
const [isEdit, setIsEdit] = useState(false);
const [resume,setResume]=useState(null)
const [filter, setFilter] = useState("All");
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5; // show 5 jobs per page
const { backendUrl, userData, userApplications, setUserApplications, fetchUserData, fetchUserApplications } = useContext(AppContext);

const updateResume = async()=>{
try{

const formData = new FormData()
formData.append('resume',resume)
const token = await getToken()
const {data} = await axios.post(backendUrl+'/api/users/update-resume',
  formData,
  {headers:{Authorization:`Bearer ${token}`}}
)
if(data.success){
  toast.success(data.message)
  await fetchUserData()

}
else{
  toast.error(data.message)
}


}
catch(error){
  toast.error(error.message)
}
setIsEdit(false)
setResume(null)
}

useEffect(() => {
  if (user) {
    fetchUserApplications().then((apps) => {
      setUserApplication(apps); // update local state for table and bookmark updates
    });
  }
}, [user]);

const exportReport = () => {
  if(userApplications.length === 0){
    toast.error("No applications to export");
    return;
  }

  // Convert applications to CSV
  const csvContent = [
    ["Company", "Job Title", "Location", "Date", "Status"],
    ...userApplications.map(job => [
      job.companyId.name,
      job.jobId.title,
      job.jobId.location,
      moment(job.date).format('ll'),
      job.status
    ])
  ].map(e => e.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `user_applications_report.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
// Filter logic
const filteredApplications =
  filter === "All"
    ? userApplications
    : userApplications.filter((job) => job.status === filter);

// Pagination logic
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);

// Calculate total pages
const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
const acceptedPercent = Math.round(
  (userApplications.filter((job) => job.status === "Accepted").length /
    (userApplications.length || 1)) *
    100
);

const handleBookmark = async (applicationId) => {
  try {
    const token = await getToken();
    const res = await axios.put(
      `${backendUrl}/api/applications/bookmark/${applicationId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // ✅ Update global applications
    setUserApplications(prev =>
      prev.map(job =>
        job._id === applicationId
          ? { ...job, bookmarked: res.data.bookmarked }
          : job
      )
    );

    toast.success(res.data.bookmarked ? "Bookmarked!" : "Removed from bookmarks");
  } catch (err) {
    console.error(err);
    toast.error("Error updating bookmark");
  }
};

  return (
    <>
  <Navbar/>
  <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
    <h2 className='text-xl font-semibold'>Your Resume</h2>
    <div className='flex gap-2 mb-6 mt-3'>
{
  isEdit || userData && userData.resume === ""
  ?<>
  <label className = 'flex items-center' htmlFor="resumeUpload">
     <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>{resume ? resume.name : "Select Resume"}</p>
     <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden/>
    <img src ={assets.profile_upload_icon} alt = ""/>
  </label>
  <button onClick = {updateResume} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2' >Save</button>
  </>
    : (
    <div className='flex gap-2'>
      {userData?.resume ? (
        <a
          className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg'
          href={userData.resume}
          target='_blank'
          rel='noopener noreferrer'
        >
          Resume
        </a>
      ) : (
        <p className='text-gray-500'>No resume uploaded</p>
      )}

      <button
        onClick={() => setIsEdit(true)}
        className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'
      >
        Edit
      </button>
    </div>
  )

}
    </div>
<h2 className='text-xl font-semibold mb-4'>
  Jobs Applied
  </h2>
  <div className="flex gap-3 mb-6">
  {/* Add New Job Button */}
  <button
    onClick={() => navigate('/finding-job')}
    className="bg-green-600 text-white px-4 py-2 rounded-lg"
  >
    Add New Job
  </button>

  {/* Export Report Button */}
  <button
    onClick={() => exportReport()}
    className="bg-orange-500 text-white px-4 py-2 rounded-lg"
  >
    Export Report
  </button>
</div>
<div className="flex justify-between items-center mb-6">
  {/* Filter Dropdown */}
  <div>
    <label className="mr-2 font-medium">Filter by Status:</label>
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="border border-gray-300 rounded-lg px-3 py-1"
    >
      <option value="All">All</option>
      <option value="Applied">Applied</option>
      <option value="Accepted">Accepted</option>
      <option value="Rejected">Rejected</option>
       <option value ="Bookmarked">Bookmarked</option>
    </select>
  </div>
</div>
{/* Progress Tracker */}
{/* Progress Tracker */}
<div className="w-full bg-gray-200 rounded-full h-3 mb-8">
  <motion.div
    className="h-3 rounded-full bg-blue-600"
    initial={{ width: 0 }}
    animate={{ width: `${acceptedPercent}%` }}
    transition={{ duration: 0.8 }}
  ></motion.div>
</div>
<p className="text-sm text-gray-500 mb-6">Progress: {acceptedPercent}%</p>




  <table className='min-w-full bg-white border-b border-gray-200
 rounded-lg'>
    <thead>
     <tr>
         <th className='py-3 px-4 border-b border-gray-200
 text-left'>Company</th>
         <th className='py-3 px-4 border-b border-gray-200
text-left'>Job Title</th>
         <th className='py-3 px-4 border-b border-gray-200
 text-left max-sm:hidden'>Location</th>
         <th className='py-3 px-4 border-b border-gray-200
 text-left max-sm:hidden'>Date</th>
         <th className='py-3 px-4 border-b border-gray-200
 text-left'>Status</th>
 <th className='py-3 px-4 border-b border-gray-200 text-left'>Bookmark</th>


     </tr>


    </thead>
 <tbody>
  {currentItems && currentItems.length > 0 ? (
    currentItems.map((job, index) => (
      <React.Fragment key={index}>
        <tr>
  <td className="py-3 px-4 flex items-center gap-2 border-b border-gray-200">
    <img
      className="w-8 h-8"
      src={job.companyId?.image || ""}
      alt={job.companyId?.name || "Company"}
    />
    {/* {job.companyId?.name || "N/A"} */}
  </td>
  <td className="py-2 px-4 border-b border-gray-200">
    {job.jobId?.title || "N/A"}
  </td>
  <td className="py-2 px-4 border-b border-gray-200 max-sm:hidden">
    {job.jobId?.location || "N/A"}
  </td>
  <td className="py-2 px-4 border-b border-gray-200 max-sm:hidden">
    {job.date ? moment(job.date).format("ll") : "N/A"}
  </td>
  <td className="py-2 px-4 border-b border-gray-200">
    <span
      className={`${
        job.status === "Accepted"
          ? "bg-green-100"
          : job.status === "Rejected"
          ? "bg-red-100"
          : "bg-blue-100"
      } px-4 py-1.5 rounded`}
    >
      {job.status || "N/A"}
    </span>
  </td>
  <td className="py-2 px-4 border-b border-gray-200">
  <button
    onClick={() => handleBookmark(job._id)}
    className={`px-2 py-1 rounded ${
      job.bookmarked ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-800"
    }`}
  >
    {job.bookmarked ? "Bookmarked" : "Bookmark"}
  </button>
</td>

</tr>

    
        <tr>
          <td colSpan="6" className="px-6 py-3 bg-gray-50">
            <CommentSection jobId={job._id} existingComment={job.comment} />
          </td>
        </tr>
      </React.Fragment>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="text-center py-4 text-gray-500">
        No applications found
      </td>
    </tr>
  )}
</tbody>



  </table>

{/* Pagination Controls */}
<div className="flex justify-center mt-6 gap-3">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
  >
    Prev
  </button>

  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      className={`px-4 py-2 rounded-lg ${
        currentPage === index + 1
          ? "bg-blue-600 text-white"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {index + 1}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
  >
    Next
  </button>
</div>

  </div>
  <Footer/>
    </>
  )
}

export default Application
