require("dotenv").config();
const createError = require("http-errors");
const {
  getRecruiterByEmail,
  getRecruiterById,
  update,
  getList,
  countAll,
} = require("../models/recruiterModel");
// const jwt = require("jsonwebtoken");
// const { sendEmail } = require("../helper/mail");
const errorServ = new createError.InternalServerError();
const helper = require("../helper/response");
// const cloudinary = "../helper/cloudinary";

const profile = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const {
      rows: [recruiters],
    } = await getRecruiterByEmail(email);
    if (!recruiters) {
      return next(createError(403, "email or password is incorrect"));
    }
    const data = {
      full_name: recruiters.full_name,
      email: recruiters.email,
      hp: recruiters.hp,
      corps_name: recruiters.corps_name,
      position: recruiters.position,
    };
    delete recruiters.password;
    helper.response(res, data, 200, "Successfully get profile recruiter");
  } catch (error) {
    // console.log(error);
    next(errorServ);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      full_name,
      hp,
      corps_name,
      corps_description,
      position,
      address,
      instagram,
      linkedin,
    } = req.body;

    const data = {
      full_name,
      hp,
      corps_name,
      position,
      corps_description,
      address,
      instagram,
      linkedin,
    };

    await update(data, id);
    helper.response(res, data, 200, "Successfully update profile recruiter");
  } catch (error) {
    console.log(error.message);
    next(errorServ);
  }
};

const list = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder || "ASC";
    const search = req.query.search || "";

    const offset = (page - 1) * limit;

    const result = await getList({
      search,
      sortBy,
      sortOrder,
      limit,
      offset,
    });
    const {
      rows: [count],
    } = await countAll();
    const totalData =
      search === "" ? parseInt(count.total) : result.rows.length;
    const totalPage = Math.ceil(totalData / limit);
    const pagination = {
      currentPage: page,
      limit,
      totalData,
      totalPage,
    };
    if (result.length > 0) {
      helper.response(res, result, 200, "Success Get Recruiter", pagination);
    } else {
      next(createError(404, "Products not found"));
    }
  } catch (error) {
    next(errorServ);
  }
};
const getRecById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      rows: [recruiters],
    } = await getRecruiterById(id);
    helper.response(res, recruiters, 200, "Success Get Recruiter");
  } catch (error) {
    next(errorServ);
  }
};

module.exports = {
  profile,
  updateProfile,
  list,
  getRecById,
};
