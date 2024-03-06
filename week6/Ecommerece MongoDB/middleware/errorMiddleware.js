export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server error";
  err.statusCode = err.statusCode || 500;

  return res.status(err.statusCode).json({
    status: "error",
    message: err.message
  })
}