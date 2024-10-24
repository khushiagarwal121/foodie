import {
  loginUser,
  logoutUser,
  generateAccessAndRefreshTokens,
} from "./authService";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate user credentials and generate tokens
    const user = await loginUser(email, password); // Assuming loginUser returns user info

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user,
      roleIds
    );

    console.log("Generated tokens:", { accessToken, refreshToken });

    // Set options for cookies
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only enable in production with HTTPS
      secure: true, // Prevent cross-site request forgery
    };

    // Set cookies with the generated tokens
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "Logged in successfully",
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken; // Get refresh token from cookie

  try {
    await logoutUser(refreshToken); // Call the service to invalidate the token

    // Optionally, clear the cookie on the client side
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "An error occurred during logout." });
  }
};

// Refresh token function in the controller
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Call the service function to handle token refreshing
    const newAccessToken = await refreshAccessToken(refreshToken);

    if (!newAccessToken) {
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }

    // Send the new access token back to the client
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export { login, logout, refreshToken };
