// require("dotenv").config();
const createError = require("http-errors");
const {
  getRecruiterByEmail,
  create,
  deleteRecruiter,
} = require("../models/recruiterModel");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../helper/mail");
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
    if (rowCount) {
      return next(createError(403, "email already exist"));
    } else if (setData.hp.length < 11) {
      return next(createError(403, "number must be 11 digit"));
    } else if (setData.password.length < 6) {
      return next(createError(403, "password must be 6-16 character"));
    } else if (req.body.confirmPassword !== password) {
      return next(createError(403, "password not match"));
    } else {
      await create(setData);
      sendMail(email);
      helper.response(res, null, 201, "you are successfully registered");
    }
  } catch (error) {
    console.log(error);
    next(errorServ);
  }
};

const login = async (req, res, next) => {
  try {
    console.log("logged in...");
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
      img_recruiter: recruiters.img_recruiter,
      corps_description: recruiters.corps_description,
      instagram: recruiters.instagram,
      linkedin: recruiters.linkedin,
      address: recruiters.address,
    };

    recruiters.token = authRecruiter.generateToken(payload);
    recruiters.refreshToken = authRecruiter.generateRefreshToken(payload);
    helper.response(res, recruiters, 200, "you are successfully logged in");
  } catch (error) {
    console.log(error);
    next(errorServ);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY);
    const payload = {
      email: decoded.email,
      role: decoded.role,
    };
    const result = {
      token: authRecruiter.generateToken(payload),
      refreshToken: authRecruiter.generateRefreshToken(payload),
    };
    // console.log(result);
    helper.response(res, result, 200);
  } catch (error) {
    console.log(error);
    next(errorServ);
  }
};

const deleteRec = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteRecruiter(id);
    helper.response(res, null, 200, "you are successfully deleted");
  } catch (error) {
    console.log(error);
    next(errorServ);
  }
};

module.exports = {
  register,
  login,
  deleteRec,
  refreshToken,
};
