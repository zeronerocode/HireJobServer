const pool = require("../config/db");

const setProfile = ({id,jobdesk, address,workplace, photo, description}) => {
    return new Promise((resolve, reject) => {
        pool.query("UPDATE profile SET (jobdesk, address, workplace, photo, description) VALUES($2, $3, $4, $5, $6) WHERE id = $1", 
        [id, jobdesk, address,workplace, photo, description], 
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
    setProfile
};