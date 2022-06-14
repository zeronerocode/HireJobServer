const createError = require("http-errors");
const { setProfile, setExperience } = require("../models/profile");
const { response } = require("../helper/response");
const errorServ = new createError.InternalServerError();

const insertProfile = async (req, res, next) => {
    try {
        const { jobdesk, address, workplace, description } = req.body;
        const id = req.params.id ;

        const data = {
            jobdesk,
            address,
            workplace,
            photo : `http://${req.get("host")}/img/${req.file.filename}`,
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

const insertExperience = async(req, res, next)=>{
    try {
        const {jobdesk, corpName, workTime, description } = req.body;
        const user_id = req.params.id ;

        const dataExperience = {
            jobdesk, 
            corpName, 
            workTime, 
            description,
            user_id
        };
        await setExperience(dataExperience);
        response(res, dataExperience, 201, "insert experience successfully");
    }catch(error){
        console.log(error);
        next(errorServ);
    }
};

const getExperience = () => {

};

module.exports = {
    insertProfile,
    insertExperience,
    getExperience
};
