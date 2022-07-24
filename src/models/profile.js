const pool = require("../config/db");

const setProfile = ({ jobdesk, address, workplace, photo, description, updatedAt, full_name }, id) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE users SET 
        full_name=COALESCE($8, full_name), 
        jobdesk=COALESCE($2, jobdesk), 
        address=COALESCE($3, address), 
        workplace=COALESCE($4, workplace), 
        photo=COALESCE($5, photo), 
        description=COALESCE($6, description), 
        updated_at=COALESCE($7, updated_at) WHERE id = $1`,
            [id, jobdesk, address, workplace, photo, description, updatedAt, full_name],
            (error, result) => {
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
            (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
    });
};

const setPortofolio = ({ appName, linkRepo, appType, appImage, user_id }) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO portofolio(app_name, link_repo, app_type, app_image, user_id) VALUES ($1, $2, $3, $4, $5)",
            [appName, linkRepo, appType, appImage, user_id],
            (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
    });
};

const setSkill = ({ skillName, user_id }) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO skills(user_id, skill_name) VALUES ($2, $1)",
            [skillName, user_id],
            (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
    });
};

const getExperienceData = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM experience WHERE user_id = $1", [id],
            (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
    });
};

const getSkillData = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM skills WHERE user_id = $1", [id],
            (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
    });
};

const getPortofolioData = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM portofolio WHERE user_id = $1", [id],
            (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
    });
};

const countUser = () => {
    return pool.query("SELECT COUNT(*) AS total FROM users");
};

const select = ({ limit, offset, sortBy, sortOrder, search }) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM users WHERE full_name ILIKE '%${search}%' ORDER BY ${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(new Error(err));
            }
        });
    });
};

const delPortofolio = (id) => {
    return pool.query("DELETE FROM portofolio WHERE id = $1", [id]);
};

const delExperience = (id) => {
    return pool.query("DELETE FROM experience WHERE id = $1", [id]);
};

const delSkill = (id) => {
    return pool.query("DELETE FROM skills WHERE id = $1", [id]);
};

module.exports = {
    setProfile,
    setExperience,
    setPortofolio,
    setSkill,
    getExperienceData,
    getSkillData,
    getPortofolioData,
    countUser,
    select,
    delPortofolio,
    delExperience,
    delSkill
};