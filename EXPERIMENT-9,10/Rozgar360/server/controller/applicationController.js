import JobApplication from "../models/JobApplication.js";

// ✅ Add or update comment for a specific job application
export const addComment = async (req, res) => {
  try {
    const { id } = req.params; // Job application ID
    const { comment } = req.body;

    const application = await JobApplication.findById(id);
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    application.comment = comment;
    await application.save();

    res.json({ success: true, message: "Comment saved successfully", application });
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET - Fetch all applications for a specific user
export const getUserApplications = async (req, res) => {
  try {
    const { userId } = req.params;

    const applications = await JobApplication.find({ userId })
     .populate("jobId", "title location")   // include location too
  .populate("companyId", "name image");

    res.json({ success: true, applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch only Accepted applications for a user excluding some IDs
// controllers/jobApplicationController.js
export const getUncelebratedAcceptedApplications = async (req, res) => {
  const userId = req.params.userId;
  const excludeIds = req.query.excludeIds ? JSON.parse(req.query.excludeIds) : [];

  try {
    const applications = await JobApplication.find({
      userId,
      status: "Accepted",
      _id: { $nin: excludeIds },
    })
    .populate("jobId", "title")
    .populate("companyId", "name");

    res.json({ applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


export const toggleBookmark = async (req, res) => {
  try {
    const { id } = req.params; // JobApplication ID

    const application = await JobApplication.findById(id);
    if (!application) return res.status(404).json({ success: false, message: "Application not found" });

    application.bookmarked = !application.bookmarked; // toggle
    await application.save();

    res.json({ success: true, bookmarked: application.bookmarked });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};