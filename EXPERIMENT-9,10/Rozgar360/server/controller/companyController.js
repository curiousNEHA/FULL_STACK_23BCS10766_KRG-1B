import Company from "../models/Company.js"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import JobApplication from "../models/JobApplication.js"
import generateToken from "../utils/generateToken.js"
import Job from '../models/Job.js'
import User from "../models/User.js";
import Notification from "../models/Notification.js";
export const registerCompany = async (req, res) => {

const {name,email,password} = req.body
const imageFile  = req.file
if(!name || !email || !password || !imageFile){
    return res.json({success : false,message : "Missing Details"})
}
try {

const companyExists = await Company.findOne({email})
if(companyExists){
return res.json({success:false,message:'company already registered'})
}
const salt = await bcrypt.genSalt(10)
const hashPassword = await bcrypt.hash(password,salt)

const imageUpload = await cloudinary.uploader.upload(imageFile.path)
const company = await Company.create(
    {
        name,email,
        password: hashPassword,
        image : imageUpload.secure_url
    }
)
res.json(
    {
        success:true,
        company : {
            _id : company._id,
            name : company.name,
            email: company.email,
            image : company.image
        },

        token : generateToken(company._id)
        
    }
)

}
catch(error){
res.json({success : false,message : error.message})
}


}

export const loginCompany = async (req,res) => {

 const {email,password} = req.body
 try{
 const company = await Company.findOne({email})
 if (!company) {
  return res.json({ success: false, message: 'Company not found' })
}
 if(await bcrypt.compare(password,company.password)){

       res.json({
        success : true,
        company :{
       id : company._id,
            name : company.name,
            email: company.email,
            image : company.image


        },

        token : generateToken(company._id)


       })

 }
 else{
    res.json({success:false,message:'Invalid email or password'})
 }

 }
 catch(error){
    res.json({success:false,message:error.message})

 }


}

export const getCompanyData = async(req,res)=>{


try{
const company = req.company
res.json({success:true,company})

}
catch(error){
res.json({
    success:false,
    message : error.message
})

}

}

export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;
  const companyId = req.company._id;

  try {
    const company = await Company.findById(companyId);
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category,
    });
    await newJob.save();

    const users = await User.find({});
    for (const user of users) {
      await Notification.create({
        userId: user._id,
        companyName: company.name,
        message: `New job posted by ${company.name}: ${title}`,
        type: "new-job",
        read: false,
      });
    }

    res.json({ success: true, newJob });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getCompanyJobApplicants = async(req,res)=>{

 try{
const companyId = req.company._id
const applications = await JobApplication.find({companyId}).populate('userId','name image resume').populate('jobId','title location category level salary').exec()
return res.json({success:true,applications})

 }
 catch(error){
res.json({success:false,message:error.message})
 }


}

export const getCompanyPostedJobs = async(req,res)=>{
try{
const companyId = req.company._id
const jobs = await Job.find({companyId})

const jobsData = await Promise.all(jobs.map(async(job)=>{
    const applicants = await JobApplication.find({jobId:job._id})
    return {...job.toObject(),applicants:applicants.length}
}))

res.json({success:true,jobsData})
}
catch(error){
res.json({success:false,message:error.message})
}


}

export const ChangeApplicationStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    // Update and then populate properly
    let application = await JobApplication.findByIdAndUpdate(id, { status }, { new: true });
    if (!application) {
      return res.json({ success: false, message: "Application not found" });
    }

    // Populate company and job details
    application = await application.populate("jobId", "title");
    application = await application.populate("companyId", "name");

    let message = "";
    if (status === "accepted") message = "Your application has been accepted!";
    else if (status === "rejected") message = "Your application has been rejected!";
    else message = `Your application status changed to ${status}`;

    // ✅ Create notification with proper company name
    await Notification.create({
      userId: application.userId,
      companyName: application.companyId?.name || "Unknown Company",
      message: `${application.companyId?.name} - ${message}`,
      type: status,
      read: false,
    });

    res.json({ success: true, message: "Status Changed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



export const changeVisibility = async(req,res)=>{

try{

    const {id} = req.body
    const companyId = req.company._id
    const job = await Job.findById(id)
    if(companyId.toString()===job.companyId.toString()){
        job.visible = !job.visible
    }
    await job.save()
    res.json({success:true,job})

}
catch(error){
res.json({success:false,message:error.message})
}


}