const web_routes = require('express').Router();
const middlewares = require('../helper/middlewares');

/* controller */
const auth = require('../controller/web_controller/auth');
/* controller */
web_routes.get('/', (req, res) => { res.send("Practical api working") })
web_routes.post('/register', auth.register);
web_routes.post('/login', auth.login);
web_routes.get('/getUsers', middlewares.routeMiddleWares, (req, res) => { res.sendSuccess({}, "working") })

module.exports = web_routes;