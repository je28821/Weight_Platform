const User = require("../Model/user");
const authService = require("../Services/authService");

module.exports.registerController = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "Register successful",
      token: result.token,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports.loginController = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    return res.status(201).json({
      success: true,
      message: "Login successful",
      token: result.token,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports.googleController = async (req, res) => {
  try {
    const { token } = req.body;

    const result = await authService.googleLogin(token);

    res.status(200).json({
      success: true,
      message: "Google login successful",
      token: result.jwtToken,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.logoutController = async (req, res) => {
  try {
    const result = await authService.logOut(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
