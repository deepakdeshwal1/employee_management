const commonResponse = (res, message, data, statusCode) => {
  return res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300, // Success if status code is in 2xx range
    message,
    data,
  });
};

const successResponse = (res, message = "Success", data = {}, statusCode = 200) => {
  return commonResponse(res, message, data, statusCode);
};

const errorResponse = (res, message = "Something went wrong", errors = {}, statusCode = 400) => {
  return commonResponse(res, message, { errors }, statusCode);
};

const serverErrorResponse = (res, message = "Internal Server Error", errors = {}, statusCode = 500) => {
  return commonResponse(res, message, { errors }, statusCode);
};

const unauthorizedResponse = (res, message = "Unauthorized access", errors = {}, statusCode = 401) => {
  return commonResponse(res, message, { errors }, statusCode);
};

// Corrected export
const responseHandler = {
  successResponse,
  errorResponse,
  serverErrorResponse,
  unauthorizedResponse,
};

export default responseHandler;
