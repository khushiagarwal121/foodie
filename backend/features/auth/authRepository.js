import { db } from "../../models/index.js";
const { User, RefreshToken } = db;

// Function to find a user by email
const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

const saveRefreshToken = async (userUuid, token) => {
  const expirationDuration = process.env.REFRESH_TOKEN_EXPIRES_IN || "7d";
  const days = parseInt(expirationDuration);
  const expirationDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000); // Set expiration to 7 days
  return RefreshToken.create({
    user_uuid: userUuid,
    token,
    expires_at: expirationDate,
  });
};

const deleteRefreshToken = async (refreshToken) => {
  return await RefreshToken.destroy({
    where: { token: refreshToken },
  });
};

// Export repository functions
export { findUserByEmail, saveRefreshToken, deleteRefreshToken };
