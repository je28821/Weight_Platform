const appointmentService = require("../Services/appointmnetService");

module.exports.addAppointmnet = async (req, res) => {
  try {
    let data = req.body;
    let userId = req.user.id;

    const result = await appointmentService.addAppointment(userId, data);

    return res.status(201).json({
      success: true,
      message: "Appoint Request Sent successfully",
      appointment: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getAppointmnet = async (req, res) => {
  try {
    let userId = req.user.id;

    const result = await appointmentService.getAppointment(userId);

    return res.status(201).json({
      success: true,
      message: "User appointments Sent Successfully",
      appointments: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.adminAppointmnet = async (req, res) => {
  try {
    const result = await appointmentService.adminAppointments();

    return res.status(201).json({
      success: true,
      message: "User appointments Sent Successfully",
      appointments: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.handleConfirm = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await appointmentService.handleConfirm(id);
    return res.status(201).json({
      success: true,
      message: "User appointments Sent Successfully",
      appointments: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.handleIgnore = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await appointmentService.handleIgnore(id);
    return res.status(201).json({
      success: true,
      message: "User appointments Sent Successfully",
      appointments: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.deleteAppointment = async (req, res) => {
  try {
    let { id } = req.params;

    const result = await appointmentService.deleteAppointment(id);

    return res.status(200).json({
      success: true,
      message: "Appointment Deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
