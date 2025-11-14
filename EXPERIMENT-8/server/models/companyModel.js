
import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  industry: String,
  size: String,
  location: String,
  website: String,
  email: String,
  phone: String,
  createdAt: { type: Date, default: Date.now }
});

const Companys = mongoose.model('Companys', companySchema);
export default Companys;
