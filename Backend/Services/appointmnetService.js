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
