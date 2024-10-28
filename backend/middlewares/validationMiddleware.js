import { respondError } from "../utils/responseHandler.js";

const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    // validation fails
    return respondError(res, {
      statusCode: 400,
      message:
        error.details[0].message ||
        "Invalid request body. Please check the input and try again.",
    });
  }

  // validation success
  next();
};
// const checkRefreshToken = (req, res, next) => {
//   // Extract refresh token from cookies
//   const refreshToken = req.cookies.refreshToken;

//   // Check if refresh token is missing
//   if (!refreshToken) {
//     return respondError(res, {
//       statusCode: 401,
//       message: "Refresh token not found. Please log in.",
//     });
//   }

//   // Proceed to the next middleware if validation passes
//   next();
// };

export {
  validateRequest,
  // , checkRefreshToken
};
