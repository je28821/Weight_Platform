const parseDescription = (req, res, next) => {
  try {
    if (req.body.description && typeof req.body.description === "string") {
      req.body.description = JSON.parse(req.body.description);
    }

    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid description format.",
    });
  }
};

module.exports = parseDescription;
