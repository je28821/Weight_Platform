const appointmentService = require("../Services/appointmnetService");

module.exports.addAppointmnet = async (req, res) => {
  try {
    let data = req.body;
    let userId = req.user.id;

    const result = await appointmentService.addAppointment(userId, data);

    return res.status(201).json({
      success: true,
      message: "Appoint Request Sent successfully",
      cart: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
