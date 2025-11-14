import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  company: { type: String },
  location: String,
  salary: Number,
  createdAt: { type: Date, default: Date.now }
});




const Joby = mongoose.model('Joby',jobSchema)
export default Joby