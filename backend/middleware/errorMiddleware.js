const errorHandler = (err, req, res, next) => {
  console.error(" SERVER ERROR:", err.stack);

  res.status(500).json({
    message: "Server error",
  });
};

module.exports = errorHandler;