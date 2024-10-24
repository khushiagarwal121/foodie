import { db } from "../../models/index.js";
const { User, RefreshToken } = db;

// Function to find a user by email
const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

const saveRefreshToken = async (userUuid, token) => {
  const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Set expiration to 7 days
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
module.exports = {
  findUserByEmail,
  saveRefreshToken,
  deleteRefreshToken,
};
