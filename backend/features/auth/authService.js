import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // For password hashing
import {
  findUserByEmail,
  saveRefreshToken,
  deleteRefreshToken,
} from "./authRepository"; // Adjust the import based on your folder structure

// Function to login a user
const loginUser = async (email, encodedPassword) => {
  // Decode the password from Base64 using the custom atob function
  const password = atob(encodedPassword);

  // Find the user by email and include associated roles
  const user = await findUserByEmail(email, {
    include: [
      {
        model: authRepository.Role, // This is your Role model
        as: "Roles", // Use the alias defined in the association
        attributes: ["uuid"], // Only fetch the UUID of each role
      },
    ],
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // Extract the role UUIDs from the associated roles
  const roleNames = user.Roles.map((role) => role.uuid);

  return { user, roleNames }; // Return user info and role IDs for token generation
};

// Function to handle user logout
const logoutUser = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("No refresh token provided");
  }

  // Call the function to invalidate the refresh token
  await deleteRefreshToken(refreshToken);
};

// Function to generate access token (short-lived)
const generateAccessToken = (user, currentRoleName) => {
  return jwt.sign(
    {
      // Include both userId and roleIds in the token payload
      userId: user.uuid,
      currentRoleName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
  );
};

// Function to generate refresh token (long-lived)
const generateRefreshToken = async (user, currentRoleName) => {
  const refreshToken = jwt.sign(
    {
      // Include both userId and roleIds in the token payload
      userId: user.uuid,
      // roleIds, //roll name
      currentRoleName, //name
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  // Save the refresh token in the database using the auth repository method
  await saveRefreshToken(user.uuid, refreshToken);
  return refreshToken;
};
// Function to generate both access and refresh tokens
const generateAccessAndRefreshTokens = async (user, currentRoleName) => {
  const accessToken = generateAccessToken(user, currentRoleName);
  const refreshToken = await generateRefreshToken(user, currentRoleName);

  return { accessToken, refreshToken };
};

const refreshAccessToken = async () => {};
// Exporting all functions at the end
export {
  loginUser,
  logoutUser,
  refreshAccessToken,
  generateAccessAndRefreshTokens,
};
