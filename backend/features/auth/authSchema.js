import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password should be at least 8 characters.",
    "any.required": "Password is required.",
  }),
  currentRoleName: Joi.string().required().messages({
    "any.required": "Role is required.",
  }),
}).strict(); // Enforces that no other fields are allowed

// Schema for logging out - ensures the request body is empty
const logoutSchema = Joi.object({}).strict().required().messages({
  "object.base": "Request body must be empty.", // Custom message for empty object
});

// Schema for refreshing the token - ensures the request body is empty
// const refreshAccessTokenSchema = Joi.object({}).strict().required().messages({
//   "object.base": "Request body must be empty.", // Custom message for empty object
// });
// in case of ivalid token also we should get logged out or even if its empty
export {
  loginSchema,
  logoutSchema,
  // refreshAccessTokenSchema
};
