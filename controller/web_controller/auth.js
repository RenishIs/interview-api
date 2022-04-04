const SHA256 = require("crypto-js/sha256");
const { generateJWTToken } = require("../../helper/general_functions");

const auth = require('../../model/auth');
const user_details = require('../../model/user_details');

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
module.exports.register = async (req, res) => {
    try {
        const { body } = req
        const addStatus = await (new auth({ email: body.email })).save();
        if (addStatus) {
            const detailsAddStatus = await (new user_details({
                auth_id: addStatus._id,
                first_name: body.first_name,
                last_name: body.last_name
            })).save();

            if (detailsAddStatus) {
                res.sendSuccess({}, "user added successfully");
            }
            else {
                res.sendError("user details not added");
            }
        }
        else {
            res.sendError("auth details not added");
        }
    }
    catch (error) {
        res.sendError(error.message);
    }
}

module.exports.login = async (req, res) => {
    try {
        const { body } = req;
        const findStatus = await auth.aggregate([
            {
                $match: { email: body.email, password: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8" }
            },
            {
                $lookup: {
                    from: "user_details",
                    localField: "_id",
                    foreignField: "auth_id",
                    as: "auth_details",
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$auth_details", 0] }, "$$ROOT"] } }
            },
            {
                $project: { email: 1, auth_id: 1, first_name: 1, last_name: 1, _id: 0 }
            }
        ])

        if (findStatus) {
            const token = await generateJWTToken(findStatus[0]);
            res.sendSuccess({ ...findStatus[0], token }, "login success")
        }
        else {
            res.sendInvalidRequest("your email and password was wrong")
        }
    }
    catch (error) {
        console.log(error)
        res.sendError(error.message);
    }
}