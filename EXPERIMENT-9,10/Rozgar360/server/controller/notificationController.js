import Notification from "../models/Notification.js";

export const addNotification = async (req, res) => {
  try {
    const { userId, message, type } = req.body;
    const notif = await Notification.create({ userId, message, type, read: false });
    res.status(201).json(notif);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
