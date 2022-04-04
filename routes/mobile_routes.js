const mobile_routes = require('express').Router();
const auth = require('../controller/mobile_controller/auth');

mobile_routes.get('/register', auth.register);
mobile_routes.get('/login', auth.login);

module.exports = mobile_routes;