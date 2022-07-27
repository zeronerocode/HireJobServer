const createError = require("http-errors");
const { response } = require("../helper/response");
const errorServ = new createError.InternalServerError();
const { addHire, getHireList } = require("../models/hire");
const { v4: uuidv4 } = require("uuid");

const addHiring = async (req, res, next) => {
    try {
        const { idJobseeker, idRecruiter, recName, recEmail, recPhone, message, purpose } = req.body;

        const dataHire = {
            id: uuidv4(), 
            idJobseeker, 
            idRecruiter, 
            recName, 
            recEmail, 
            recPhone, 
            message, 
            purpose
        };

        await addHire(dataHire);
        console.log(dataHire);

        response(res, dataHire, 201, "add hire successful");
    } catch (error) {
        console.log(error);
        next(errorServ);
    }
};

const getHire = async (req, res, next) => {
    try {
        const id = req.decoded.id;
        const result = await getHireList(`${id}`);
        response(res, result.rows, 200, "get hire data success");
    } catch (error) {
        console.log(error);
        next(errorServ);
    }
};

module.exports = {
    addHiring,
    getHire
};
