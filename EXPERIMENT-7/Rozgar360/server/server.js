import express from 'express';
import './config/instrument.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { connect } from 'mongoose';
import connectDB from './config/db.js';
import 'dotenv/config';
const app = express();
app.use(cors());
app.use(express.json());
await connectDB()

app.get('/', (req, res) => {
  res.send('API is running....');
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
