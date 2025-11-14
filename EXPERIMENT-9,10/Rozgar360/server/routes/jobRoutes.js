import express from 'express'
import { getJobById, getJobs } from '../controller/jobController.js';
import Job from '../models/Job.js';
const router = express.Router()

router.get('/',getJobs)

router.get('/:id',getJobById)

router.get('/suggest/titles', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);

  try {
    const jobs = await Job.find({ title: { $regex: q, $options: 'i' } }).limit(10);
    const titles = jobs.map(job => job.title);
    res.json([...new Set(titles)]); // remove duplicates
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

// GET /api/jobs/suggest/locations?q=
router.get('/suggest/locations', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);

  try {
    const jobs = await Job.find({ location: { $regex: q, $options: 'i' } }).limit(10);
    const locations = jobs.map(job => job.location);
    res.json([...new Set(locations)]); // remove duplicates
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});
export default router;