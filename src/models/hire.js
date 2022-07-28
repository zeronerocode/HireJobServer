const pool = require("../config/db");

const addHire = ({ id, idJobseeker, idRecruiter, recName, recEmail, recPhone, message, purpose }) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO hiring(id, id_jobseeker, rec_id, rec_name, rec_email, rec_phone, message, purpose)VALUES($1, $2, $3, $4, $5, $6, $7, $8)", [id, idJobseeker, idRecruiter, recName, recEmail, recPhone, message, purpose], (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(new Error(err));
            }
        });
    });
};

const getHireList = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM hiring WHERE id_jobseeker = ${id};`, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(new Error(err));
            }
        });
    });
};

module.exports = {
    addHire,
    getHireList
};