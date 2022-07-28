const pool = require("../config/db");
const findEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE email = $1", [email], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const findById = (userId) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE id = $1;", [userId], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const insert = ({ id, email, password, name, hp }) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO users(id, email, password, full_name, hp)VALUES($1, $2, $3, $4, $5)", [id, email, password, name, hp], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const deleteUser = ({ email }) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM products WHERE email = $1", [email], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const checkIdUser = (id) => {
  console.log("model id => ",id);
  return pool.query("SELECT * FROM users WHERE id = $1", [id]);
};

const activate = (id) => {
  console.log(`id ${id}`);
  return pool.query(`UPDATE users SET is_active = true where id = '${id}'`);
};

module.exports = {
  findEmail,
  findById,
  insert,
  deleteUser,
  checkIdUser,
  activate
};
