import express from "express";
import {
  login,
  logout,
  // refreshAccessToken
} from "./authController.js";
import {
  loginSchema,
  logoutSchema,
  // refreshAccessTokenSchema,
} from "./authSchema.js";
import {
  validateRequest,
  // checkRefreshToken,
} from "../../middlewares/validationMiddleware.js";
import { authenticate } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/login").post(validateRequest(loginSchema), login);
router
  .route("/logout")
  .post(authenticate, validateRequest(logoutSchema), logout);
// router
//   .route("/refresh-access-token")
//   .post(
//     checkRefreshToken,
//     validateRequest(refreshAccessTokenSchema),
//     refreshAccessToken
//   );

// Use export default for ES6 module syntax
export default router;
