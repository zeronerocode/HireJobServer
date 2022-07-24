const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const protect = (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      let decoded = jwt.verify(token, process.env.SECRET_KEY);
      // let decoded = jwt.verify(token, 'dsfasdfsdaf');
      console.log(decoded);
      req.decoded = decoded;
      next();
    } else {
      next(createError(400, "server need token"));
    }
  } catch (error) {
    console.log(error.name);
    // console.log(error);
    if (error && error.name === "JsonWebTokenError") {
      next(createError(400, "token invalid"));
    } else if (error && error.name === "TokenExpiredError") {
      next(createError(400, "token expired"));
    } else {
      next(createError(400, "Token not active"));
    }
  }
};
const isRecruiter = (req, res, next) => {
  try {
    if (req.decoded.recruiters.role === "recruiter") {
      next();
    } else {
      next(createError(400, "you are not recruiter"));
    }
  } catch (error) {
    console.log(error);
    next(createError(400, "you are not recruiter"));
  }
};
module.exports = {
  protect,
  isRecruiter,
};
