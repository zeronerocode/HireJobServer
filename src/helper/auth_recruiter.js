require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const verifyOption = {
    expiresIn: process.env.TOKEN_EXPIRES,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, verifyOption);
  return token;
};

const generateRefreshToken = (payload) => {
  const verifyOption = {
    expiresIn: process.env.TOKEN_REFRESH_EXPIRES,
  };
  const token = jwt.sign(
    payload,
    process.env.SECRET_KEY_REFRESH_TOKEN,
    verifyOption
  );
  return token;
};

module.exports = {
  generateToken,
  generateRefreshToken,
};
