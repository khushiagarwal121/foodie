// middleware/authenticate.js

import jwt from "jsonwebtoken";
import { refreshAccessToken } from "../features/auth/authService"; // Adjust the path as needed

const authenticate = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    if (!refreshToken) {
      return res.status(401).json({
        error: "Unauthorized. Access and refresh tokens are missing.",
      });
    }

    try {
      // Use the refresh token to generate a new access token
      const newAccessToken = await refreshAccessToken(refreshToken);
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
      }); // Set new access token

      req.user = jwt.decode(newAccessToken); // Attach user data to the request
      return next(); // Continue to the next middleware/route handler
    } catch (err) {
      return res
        .status(403)
        .json({ error: "Invalid or expired refresh token" });
    }
  } else {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded; // Attach the user info to the request
      return next();
    } catch (err) {
      return res
        .status(401)
        .json({ error: "Access token is invalid or expired" });
    }
  }
};

export default authenticate;
