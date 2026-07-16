const Appointment = require("../Model/appointment");

module.exports.addAppointment = async (userId, data) => {
  if (data.type !== "Home Repair") {
    delete data.address;
  }

  return await Appointment.create({
    ...data,
    user: userId,
  });
};
