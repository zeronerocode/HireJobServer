const createError = require("http-errors");
const { setProfile } = require("../models/profile");
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
        console.log(data);
        await setProfile(data, id);
        response(res, data, 201, "insert profile successfully");

    } catch (error) {
        console.log(error);
        next(errorServ);
    }
};

module.exports = {
    insertProfile
};
