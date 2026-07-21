const Appointment = require("../Model/appointment");
const User = require("../Model/user");

module.exports.addAppointment = async (userId, data) => {
  try {
    if (data.type !== "Home Repair") {
      delete data.address;
    }
    const appointment = await Appointment.create({
      ...data,
      user: userId,
    });

    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          appointments: appointment._id,
        },
      },
      {
        returnDocument: "after",
      },
    );

    return appointment;
  } catch (err) {
    console.error(err);
  }
};

module.exports.getAppointment = async (userId) => {
  const user = await User.findById(userId).populate("appointments");

  if (!user) {
    throw new Error("User not found");
  }

  return user.appointments;
};

module.exports.adminAppointments = async () => {
  const appointments = await Appointment.find({}).populate("user", "name");
  return appointments;
};

module.exports.handleConfirm = async (id) => {
  const appointments = await Appointment.findByIdAndUpdate(
    id,
    {
      $set: {
        status: "Confirmed",
      },
    },
    {
      new: true,
    },
  );
  return appointments;
};

module.exports.handleIgnore = async (id) => {
  const appointments = await Appointment.findByIdAndUpdate(
    id,
    {
      $set: {
        status: "Cancelled",
      },
    },
    {
      new: true,
    },
  );
  return appointments;
};
