import express from 'express';
import './config/instrument.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { connect } from 'mongoose';
import connectDB from './config/db.js';
import 'dotenv/config';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controller/webHooks.js';
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'
import applicationRoutes from "./routes/applicationRoutes.js";
import http from "http";
import { Server } from "socket.io";
import resumeRoutes from "./routes/resumeRoutes.js";
import personRoutes from './routes/personRoutes.js';
import companyRoute from './routes/companyRoute.js';
import jobRoute from './routes/jobRoute.js';
import govtJobsRouter from './routes/govtJobs.js';
import notifications from './routes/notifications.js';
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // replace with your frontend URL
    methods: ["GET", "POST"],
  },
});
await connectDB()
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())
app.use("/api/resume", resumeRoutes);

await connectCloudinary()
app.use("/api/notifications", notifications);
app.use("/api/applications", applicationRoutes);
app.use('/api/jobs',jobRoutes)
app.get('/', (req, res) => {
  res.send('API is running....');
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks',clerkWebhooks)
app.use('/api/company',companyRoutes)
app.use('/api/jobs',jobRoutes)
app.use('/api/users',userRoutes)
// ✅ Store active users
app.use("/api/people", personRoutes);
app.use("/api/job", jobRoute);
app.use("/api/companies", companyRoute);
app.use('/api', govtJobsRouter);
let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Add user
  socket.on("registerUser", (userId) => {
    if (!onlineUsers.some((u) => u.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id });
    }
    console.log("Active users:", onlineUsers);
  });

  // Send notification
  socket.on("sendNotification", ({ receiverId, message }) => {
    const user = onlineUsers.find((u) => u.userId === receiverId);
    if (user) {
      io.to(user.socketId).emit("receiveNotification", message);
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((u) => u.socketId !== socket.id);
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



