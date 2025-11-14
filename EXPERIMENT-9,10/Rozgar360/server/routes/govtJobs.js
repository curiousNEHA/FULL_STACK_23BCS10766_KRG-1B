import express from 'express';
import Parser from 'rss-parser';

const router = express.Router();
const parser = new Parser();

const feeds = [
  'https://www.govtjobguru.in/feed/',
 'https://upsc.gov.in/rss.xml'
 
];

router.get('/govt-jobs', async (req, res) => {
  try {
    const allJobs = [];

    for (const url of feeds) {
      const feed = await parser.parseURL(url);
      const jobs = feed.items.map(item => ({
        source: feed.title,
        title: item.title,
        link: item.link,
        date: item.pubDate
      }));
      allJobs.push(...jobs);
    }

    // Optional: sort by date descending
    allJobs.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({ jobs: allJobs });
  } catch (err) {
    console.error("Error fetching govt jobs:", err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

export default router;