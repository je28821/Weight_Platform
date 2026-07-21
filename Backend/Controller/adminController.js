const adminService = require("../Services/adminService");

module.exports.getDashboardData = async (req, res) => {
  try {
    const result = await adminService.getDashboardData();

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
