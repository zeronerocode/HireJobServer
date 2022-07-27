const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { findEmail, insert, deleteUser, findById } = require("../models/users");
const { response } = require("../helper/response");
const jwt = require("jsonwebtoken");
const authHelper = require("../middleware/auth");

const register = async (req, res, next) => {
  try {
    const { email, password, hp, name } = req.body;
    const { rowCount } = await findEmail(email);

    const salt = bcrypt.genSaltSync(8);
    const hashPassword = bcrypt.hashSync(password, salt);

    if (rowCount) {
      return next(createError(403, "email already exist"));
    }

    const data = {
      id: uuidv4(),
      email,
      hp,
      password: hashPassword,
      name
    };
    await insert(data);
    // sendEmail(email);
    response(res, data, 201, "you are successfully registered");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { rows: [user] } = await findEmail(email);
    // const user = rows[0]
    if (!user) {
      return response(res, null, 403, "email or password is incorrect");
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return response(res, null, 403, "email or password is incorrect");
    }
    delete user.password;

    const payload = {
      email: user.email,
      full_name: user.full_name,
      role: user.roles,
      id: user.id,
      hp: user.hp,
      jobdesk: user.jobdesk,
      address: user.address,
      workplace: user.workplace,
      photo: user.photo,
      description: user.description
    };

    // generate token
    user.token = authHelper.generateToken(payload);
    user.refreshToken = authHelper.gerateRefreshToken(payload);

    response(res, user, 201, "anda berhasil login");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const getProfile = async (req, res, next) => {
  const email = req.decoded.email;

  try {
    const { rows: [user] } = await findEmail(email);

    if (user === undefined) {
      res.json({
        message: "invalid token"
      });
      return;
    }

    delete user.password;
    response(res, user, 200, "Get Data success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const getProfileById = async (req, res, next) => {
  const {id} = req.body;

  try {
    const { rows: [user] } = await findById(id);

    if (user === undefined) {
      res.json({
        message: "invalid token"
      });
      return;
    }

    delete user.password;
    response(res, user, 200, "Get Data success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const delUser = (req, res, next) => {
  const email = req.params.email;
  deleteUser(email)
    .then(() => {
      response(res, email, 201, "User Deleted");
    })
    .catch((error) => {
      console.log(error);
      next(new createError.InternalServerError());
    });
};

const refreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT);
  const payload = {
    email: decoded.email,
    role: decoded.role
  };
  const result = {
    refreshToken: authHelper.gerateRefreshToken(payload)
  };
  response(res, result, 200, "you are successfully logged in");
};
module.exports = {
  register,
  login,
  getProfile,
  getProfileById,
  delUser,
  refreshToken
};
