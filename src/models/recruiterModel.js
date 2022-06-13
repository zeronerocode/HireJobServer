const pool = require("../config/db");

const getRecruiterByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM recruiters WHERE email = $1",
      [email],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const create = async ({
  id,
  email,
  password,
  full_name,
  corps_name,
  position,
  hp,
  role,
  recStatus,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO recruiters (id, email, password, full_name, corps_name,  position, hp, role, recStatus) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        id,
        email,
        password,
        full_name,
        corps_name,
        position,
        hp,
        role,
        recStatus,
      ],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};
module.exports = {
  getRecruiterByEmail,
  create,
};
