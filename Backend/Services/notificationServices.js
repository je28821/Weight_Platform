const Notification = require("../Model/notification");

module.exports.createNotification = async ({
  user,
  title,
  message,
  type,
  referenceId = null,
}) => {
  try {
    const notification = await Notification.create({
      user,
      title,
      message,
      type,
      referenceId,
    });

    return notification;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.getUserNotifications = async (userId) => {
  try {
    const notifications = await Notification.find({
      user: userId,
    }).sort({ createdAt: -1 });

    return notifications;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.markAsRead = async (notificationId) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      {
        isRead: true,
      },
      {
        new: true,
      },
    );

    if (!notification) {
      throw new Error("Notification not found");
    }

    return notification;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.markAllAsRead = async (userId) => {
  try {
    await Notification.updateMany(
      {
        user: userId,
        isRead: false,
      },
      {
        isRead: true,
      },
    );

    return;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.deleteNotification = async (notificationId) => {
  try {
    const notification = await Notification.findByIdAndDelete(notificationId);

    if (!notification) {
      throw new Error("Notification not found");
    }

    return notification;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
