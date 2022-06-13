// require("dotenv").config();
const createError = require("http-errors");
const { getRecruiterByEmail, create } = require("../models/recruiterModel");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
// const jwt = require("jsonwebtoken");
const { sendEmail } = require("../helper/mail");
const errorServ = new createError.InternalServerError();
const helper = require("../helper/response");
const authRecruiter = require("../helper/auth_recruiter");

const register = async (req, res, next) => {
  try {
    const { email, password, full_name, corps_name, position, hp } = req.body;
    const { rowCount } = await getRecruiterByEmail(email);
    // console.log(rowCount);
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    // console.log(hashPassword);
    if (rowCount) {
      return next(createError(403, "email already exist"));
    }
    const setData = {
      id: uuidv4(),
      email,
      password: hashPassword,
      full_name,
      corps_name,
      position,
      hp,
      role: "recruiter",
      recStatus: "not verified",
    };
    await create(setData);
    sendEmail(email);
    helper.response(res, null, 201, "you are successfully registered");
  } catch (error) {
    console.log(error);
    next(errorServ);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const {
      rows: [recruiters],
    } = await getRecruiterByEmail(email);
    if (!recruiters) {
      return next(createError(403, "email or password is incorrect"));
    }
    const checkPassword = bcrypt.compareSync(password, recruiters.password);
    if (!checkPassword) {
      return next(createError(403, "email or password is incorrect"));
    }
    delete recruiters.password;

    const payload = {
      email: recruiters.email,
      id: recruiters.id,
      full_name: recruiters.full_name,
      hp: recruiters.hp,
      corps_name: recruiters.corps_name,
      position: recruiters.position,
      role: recruiters.role,
      recStatus: recruiters.recStatus,
    };

    recruiters.token = authRecruiter.generateToken(payload);
    recruiters.refreshToken = authRecruiter.generateRefreshToken(payload);
    helper.response(res, recruiters, 200, "you are successfully logged in");
  } catch (error) {
    console.log(error);
    next(errorServ);
  }
};

module.exports = {
  register,
  login,
};
