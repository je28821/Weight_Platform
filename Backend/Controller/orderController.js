const orderService = require("../Services/orderService");

module.exports.addOrder = async (req, res) => {
  try {
    let userId = req.user.id;

    const result = await orderService.addOrder(userId);

    return res.status(201).json({
      success: true,
      message: "Order Add Successfully",
      order: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getOrder = async (req, res) => {
  try {
    let userId = req.user.id;

    const result = await orderService.getOrder(userId);

    return res.status(201).json({
      success: true,
      message: "User Orders Sent Successfully",
      orders: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
