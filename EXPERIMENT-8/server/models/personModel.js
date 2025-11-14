import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  jobTitle: String,
  companyName: String,
  email: String,
  linkedin: String,
  twitter: String,
  location: String,
  phone: String,
  createdAt: { type: Date, default: Date.now }
});

const Person = mongoose.model('Person', personSchema);
export default Person;
