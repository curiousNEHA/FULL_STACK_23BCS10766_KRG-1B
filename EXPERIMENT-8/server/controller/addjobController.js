
import Joby from "../models/jobModel.js";
export const getJob = async (req, res) => {
  try {
    const jobs = await Joby.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addJob = async (req, res) => {
  try {
    const job = await Joby.create(req.body);
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    await Joby.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
