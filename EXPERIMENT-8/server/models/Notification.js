import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "User", required: true },
     companyName: { type: String }, // ✅ Add this line
    message: { type: String, required: true },
    type: { type: String },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);


const Notification = mongoose.model('Notification',notificationSchema)
export default Notification

