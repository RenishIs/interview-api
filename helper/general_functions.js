const config = require('../config/config.json');
const jwt = require('jsonwebtoken');


const generateJWTToken = async (payload) => {
    return jwt.sign({ email: payload.email, user_id: payload.auth_id}, config.secret_key, { expiresIn: "24h" });
}


module.exports = {
    generateJWTToken: generateJWTToken
}