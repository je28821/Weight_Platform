module.exports.validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.flatten().fieldErrors,
      });
    }

    req.body = result.data;
    next();
  };
};
module.exports.cheack = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body.data);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.flatten().fieldErrors,
      });
    }

    req.body = result.data;
    next();
  };
};
