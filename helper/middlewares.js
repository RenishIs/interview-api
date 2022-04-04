
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

const routeMiddleWares = async (req, res, next) => {
    const bearerHeader = req.headers['x-access-token'] || req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1];
        return jwt.verify(token, config.secret_key, async (err, userData) => {
            if (err) {
                res.sendForbidden(err.toString());
            }
            else {
                req.user = userData;
                next();
            }
        })
    }
    else {
        res.sendUnAuthorized("token missing")
    }
}

const backupMiddleWares = async (req, res, next) => {
    const bearerHeader = req.headers['backup-token'];
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader
        if (process.env.BACKUP_TOKEN === token) next();
        else res.sendForbidden("backup token not match");
    }
    else {
        res.sendUnAuthorized("backup token missing")
    }
}

module.exports = {
    routeMiddleWares: routeMiddleWares,
    backupMiddleWares: backupMiddleWares
}