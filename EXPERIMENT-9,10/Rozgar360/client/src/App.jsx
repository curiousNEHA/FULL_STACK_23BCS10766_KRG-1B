import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Application from './pages/Application'
import RecruiterLogin from './components/RecruiterLogin'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ViewApplication from './pages/ViewApplication'
import ManageJobs from './pages/ManageJobs' 
import 'quill/dist/quill.snow.css'; 
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ApplicationTracking from './components/ApplicationTracking'
import Analyzer from './components/Analyzer'
import FindJob from './components/FindJob'
import Notification from './components/Notification'
import AddPeople from './pages/AddPeople'
import AddCompany from './pages/AddCompany'
import GovernmentJobs from './pages/GovernmentJobs'
import ResultPage from "./pages/ResultPage";
import Features from './pages/Features'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'
import Contact from './pages/Contact'
//
<Route path="/analyze/result" element={<ResultPage />} />

function App() {
  const [count, setCount] = useState(0)
const {showRecruiterLogin,companyToken}=useContext(AppContext)
  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer/>
      <Routes>
                <Route path="/features" element={<Features />} />
<Route path="/how-it-works" element={<HowItWorks />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
        <Route path='/' element={<Home />} />
        <Route path="/analyze/result" element={<ResultPage />} />
          <Route path="/government-jobs" element={<GovernmentJobs />} />
        <Route path = '/track' element = {<ApplicationTracking />} />
         <Route path = '/finding-job' element = {<FindJob />} />
         <Route path = 'analyze-resume' element = {<Analyzer />} />
        <Route path='/apply-job/:id' element={<ApplyJob/>} />
             <Route path='/add-people' element={<AddPeople/>} />
           <Route path='/add-company' element={<AddCompany/>} />
        <Route path='/applications' element={<Application/>} />
        <Route path = '/dashboard' element = {<Dashboard/>}>
         <Route path='notify' element={<Notification/>} />
 

     
        {
         companyToken ?
         <>
         <Route path = 'add-job' element = {<AddJob/>} />
            <Route path = 'view-applications' element = {<ViewApplication/>} />
            <Route path = 'manage-jobs' element = {<ManageJobs/>} />
            
         
         </>: null



        }
           
        </Route>
      </Routes>
        
    </div>
  )
}

export default App
