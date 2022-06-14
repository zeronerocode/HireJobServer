const pool = require("../config/db");

const setProfile = ({jobdesk, address, workplace, photo, description },id) => {
    return new Promise((resolve, reject) => {
        pool.query("UPDATE users SET jobdesk=$2, address=$3, workplace=$4, photo=$5, description=$6 WHERE id = $1",
            [id, jobdesk, address, workplace, photo, description],
            (result, error) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
    });
};

const setExperience = ({ jobdesk, corpName, workTime, description, user_id }) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO experience(jobdesk, corps_name, work_time, description, user_id) VALUES ($1,$2,$3,$4,$5)",
            [jobdesk, corpName, workTime, description, user_id],
            (result, error) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
    });
};

module.exports = {
    setProfile,
    setExperience,
};