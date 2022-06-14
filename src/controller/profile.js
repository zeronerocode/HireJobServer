const createError = require("http-errors");
const { setProfile, setExperience, setPortofolio, setSkill, getExperienceData, getSkillData, getPortofolioData } = require("../models/profile");
const { response } = require("../helper/response");
const errorServ = new createError.InternalServerError();

const insertProfile = async (req, res, next) => {
    try {
        const { jobdesk, address, workplace, description } = req.body;

        const id = req.decoded.id;
        const data = {
            jobdesk,
            address,
            workplace,
            photo: req.file.path,
            description,
            updatedAt: new Date()
        };

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

const getExperience = async(req, res, next) => {
    try {
        const id = req.decoded.id;
        const result = await getExperienceData(id);
        response(res, result, 200, "get data experience");
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

const getSkill = async(req, res, next) => {
    try {
        const id = req.decoded.id;
        const result = await getSkillData(id);
        response(res, result, 200, "get data experience");
      } catch (error) {
        console.log(error);
        next(errorServ);
      }
};

const getPortofolio = async(req, res, next) => {
    try {
        const id = req.decoded.id;
        const result = await getPortofolioData(id);
        response(res, result, 200, "get data portofolio");
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
    getPortofolio
};
