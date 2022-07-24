const createError = require("http-errors");
const { setProfile, setExperience, setPortofolio, setSkill, getExperienceData, getSkillData, getPortofolioData, countUser, select, delExperience, delPortofolio, delSkill } = require("../models/profile");
const { response } = require("../helper/response");
const errorServ = new createError.InternalServerError();

const insertProfile = async (req, res, next) => {
    let photo
    
    if(req.file) {
        photo = req.file.path
    } else {
        photo = null
    }
    // console.log(req.file.path)

    try {
        const { jobdesk = null, address = null, workplace = null, description = null, full_name = null } = req.body;

        console.log(req.body)

        const id = req.decoded.id;
        const data = {
            full_name,
            jobdesk,
            address,
            workplace,
            photo,
            description,
            updatedAt: new Date()
        };

        // console.log(data)

        await setProfile(data, id);
        response(res, data, 201, "insert profile successfully");

    } catch (error) {
        console.log(error);
        next(errorServ);
    }
};

const insertExperience = async (req, res, next) => {
    try {
        const { jobdesk, corpName, workTime, description } = req.body;
        const user_id = req.decoded.id;

        const dataExperience = {
            jobdesk,
            corpName,
            workTime,
            description,
            user_id
        };
        await setExperience(dataExperience);
        response(res, dataExperience, 201, "insert experience successfully");
    } catch (error) {
        console.log(error);
        next(errorServ);
    }
};

const getExperience = async (req, res, next) => {
    try {
        const id = req.decoded.id;
        const result = await getExperienceData(id);
        response(res, result.rows, 200, "get data experience");
    } catch (error) {
        console.log(error);
        next(errorServ);
    }
};

const insertPortofolio = async (req, res, next) => {
    try {
        const { appName, linkRepo, appType } = req.body;
        const user_id = req.decoded.id;
        const dataPortofolio = {
            appName,
            linkRepo,
            appType,
            appImage: req.file.path,
            user_id
        };
        await setPortofolio(dataPortofolio);
        response(res, dataPortofolio, 201, "insert experience successfully");
    } catch (error) {
        console.log(error);
        next(errorServ);
    }
};

const insertSkill = async (req, res, next) => {
    try {
        const { skillName } = req.body;
        const user_id = req.decoded.id;

        const dataSkill = {
            skillName,
            user_id
        };
        setSkill(dataSkill);
        response(res, dataSkill, 201, "insert skill successfully");
    } catch (error) {
        console.log(error);
        next(errorServ);
    }
};

const getSkill = async (req, res, next) => {
    try {
        const id = req.decoded.id;
        const result = await getSkillData(id);
        response(res, result.rows, 200, "get data experience");
    } catch (error) {
        console.log(error);
        next(errorServ);
    }
};

const getPortofolio = async (req, res, next) => {
    try {
        const id = req.decoded.id;
        const result = await getPortofolioData(id);
        response(res, result.rows, 200, "get data portofolio");
    } catch (error) {
        console.log(error);
        next(errorServ);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 4;
        const offset = (page - 1) * limit;
        const sortBy = req.query.sortby || "id";
        const sortOrder = req.query.sortorder || "asc";
        const search = req.query.search || "";

        const result = await select({ limit, offset, sortBy, sortOrder, search });

        const { rows: [count] } = await countUser();
        const totalData = search === "" ? parseInt(count.total) : (result.rows).length;

        if (totalData < limit) {
            limit = totalData;
        }

        if ((result.rows).length === 0) {
            response(res, 404, "Data not found");
        }

        const totalPage = Math.ceil(totalData / limit);
        const pagination = {
            currentPage: page,
            dataPerPage: limit,
            totalData,
            totalPage
        };

        for (let i = 0; i < totalData; i++) {
            // console.log(result.rows[i].user_password)
            delete result.rows[i].user_password;
        }

        response(res, result.rows, 200, "Get data success", pagination);
    } catch (error) {
        console.log(error);
        next(errorServ);
    }
};

const deleteExperience = async (req, res, next) => {
    const id = req.params.id;

    try {

        delExperience(id);

        response(res, id, 200, "Delete data success");
    } catch (error) {
        console.log(error);
        next(errorServ);
    }
};

const deletePortofolio = async (req, res, next) => {
    const id = req.params.id;

    try {
        delPortofolio(id);

        response(res, id, 200, "delete portofolio success");
    } catch (error) {
        console.log(error);
        next(errorServ);
    }
};
const deleteSkill = async (req, res, next) => {
    const id = req.params.id;

    try {
        delSkill(id);

        response(res, id, 200, "delete skill success");
    } catch (error) {
        console.log(error);
        next(errorServ);
    }
};

module.exports = {
    insertProfile,
    insertExperience,
    getExperience,
    insertPortofolio,
    insertSkill,
    getSkill,
    getPortofolio,
    getUsers,
    deleteExperience,
    deletePortofolio,
    deleteSkill
};
