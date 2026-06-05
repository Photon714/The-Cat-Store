const { constants } = require("../Error-Constants.js");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.BAD_REQUEST:
      res.json({
        title: "BAD REQUEST",
        message: err.message,
        stackTree: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "SERVER ERROR",
        message: err.message,
        stackTree: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "UNAUTHORIZED",
        message: err.message,
        stackTree: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "NOT FOUND",
        message: err.message,
        stackTree: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "FORBIDDEN",
        message: err.message,
        stackTree: err.stack,
      });
      break;

    default:
      console.log("No Error, All good !"); // Or log the unexpected error
      res.json({
        title: "UNKNOWN ERROR",
        message: err.message,
        stackTree: err.stack,
      });
      break;
  }
};

module.exports = errorHandler;
