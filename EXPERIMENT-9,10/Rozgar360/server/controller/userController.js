
import User from '../models/User.js'
import JobApplication from '../models/JobApplication.js'
import Job from '../models/Job.js'

import {v2 as cloudinary} from 'cloudinary'
export const getUserData = async (req, res) => {
    
    try {
      const userId = req.auth.userId; 
        if (!userId) return res.status(401).json({ success: false, message: "User not found" });

        const user = await User.findById(userId);
        if(!user){
            return res.json({success:false,message:'User not found'})
        }
        res.json({ success: true, user });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

    
export const applyForJob = async(req,res)=>{
    
const {jobId} = req.body
const userId = req.auth.userId
try{
    const isAlreadyApplied = await JobApplication.find({jobId,userId})
    if(isAlreadyApplied.length>0){
        return res.json({success:false,message:'Already Applied'})
    }

    const jobData = await Job.findById(jobId)
    if(!jobData){
        return res.json({success:false,message:'Job not found'})
    }
    await JobApplication.create({
        companyId:jobData.companyId,
        userId,
        jobId,
        date: Date.now()
    })
    res.json({success:true,message:'Applied Successfully'})
}
catch(error){
    res.json({success:false,message:error.message})
}

}

export const getUserJobApplications = async(req,res)=>{
    try{
      const userId = req.auth.userId
      const applications = await JobApplication.find({userId})
      .populate('companyId','new email image')
      .populate('jobId','title description location category level salary')
      .exec()
        if(!applications){

            return res.json({success:false,message:'No job applications found for this user'})
        }
 
        return res.json({success:true,applications})

    }
    catch(error){

res.json({success:false,message:error.message})

    }


}

export const updateUserResume = async(req,res)=>{
 try{

    const userId = req.auth.userId
    const resumeFile = req.resumeFile
    const userData = await User.findById(userId)
   if(resumeFile){
    const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
   userData.resume = resumeUpload.secure_url   
} 

await userData.save()

return res.json({success:true,message:'Resume Updated'})

}

catch(error){
    res.json({success:false,message:error.message})
}
    


}

export const handleNewUser = async (req, res) => {
  try {
    const { id: clerkId, first_name, last_name, email_address, profile_image_url } = req.body;

    // Check if user already exists
    const existingUser = await User.findById(clerkId);
    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }

    // Create new user in MongoDB
    const newUser = new User({
      _id: clerkId,
      name: `${first_name} ${last_name}`,
      email: email_address,
      image: profile_image_url,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error" });
  }
};