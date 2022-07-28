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

const getRecruiterById = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM recruiters WHERE id = $1",
      [id],
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

const update = (
  {
    full_name,
    corps_name,
    position,
    hp,
    corps_description,
    instagram,
    linkedin,
    address,
  },
  id
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE recruiters SET full_name = COALESCE($1, full_name), corps_name = COALESCE($2, corps_name), position = COALESCE($3, position), hp = COALESCE($4, hp), corps_description = COALESCE($5, corps_description), instagram = COALESCE($6, instagram), linkedin = COALESCE($7, linkedin), address = COALESCE($8, address) WHERE id = $9",
      // "UPDATE recruiters SET full_name = $1, corps_name = $2, position = $3, hp = $4,  corps_description = $5, instagram = $6, linkedin = $7, address = $8 WHERE id = $9;",
      [
        full_name,
        corps_name,
        position,
        hp,
        corps_description,
        instagram,
        linkedin,
        address,
        id,
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
const getList = ({ limit, offset, sortBy, sortOrder, search }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM recruiters WHERE full_name ILIKE '%${search}%' ORDER BY ${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`,
      (err, result) => {
        if (!err) {
          resolve(result.rows);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};
const countAll = () => {
  return pool.query("SELECT COUNT(*) AS total FROM recruiters");
};

const deleteRecruiter = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM recruiters WHERE id = $1", [id], (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

const activate = (email) => {
  // console.log(`id ${id}`);
  return pool.query(`UPDATE recruiters SET recstatus = verified WHERE email = '${email}'`);
};

module.exports = {
  getRecruiterByEmail,
  getRecruiterById,
  create,
  update,
  getList,
  countAll,
  deleteRecruiter,
  activate
};
