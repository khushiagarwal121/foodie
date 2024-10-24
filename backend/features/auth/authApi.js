import express from "express";
import authController from "./authController.js";

const router = express.Router();

router.route("/auth/login").post(authController.login);
router.route("/auth/logout").post(authController.logout);
router.route("/auth/refresh-token").post(authController.refreshToken);

// Use export default for ES6 module syntax
export default router;
