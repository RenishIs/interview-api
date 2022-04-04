const config = require('./config/config.json');

const http = require('http');
const express = require('express');
const socket = require('./helper/socket');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

/* for nosql */
const nosql = require('./db/nosql');
/* for nosql */

/* routes */
const web_routes = require('./routes/web_routes');
const mobile_routes = require('./routes/mobile_routes');
const backup_routes = require('./routes/backup_routes');
/* routes */

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));

app.use(cors())

/* nosql connection */
nosql.db_connection()
/* nosql connection */

/* apidoc  */
app.use('/web_api_doc', express.static('./apidoc/web_api'));
app.use('/mobile_api_doc', express.static('./apidoc/mobile_api'));
/* apidoc  */

app.use(express.static(__dirname + '/images'));

app.use('/web/v1', web_routes);

app.use('/mobile/v1', mobile_routes);

app.use('/backup/v1', backup_routes);
/* socket */
socket.init(server);
/* socket */

/* Express Custom Function */
require("./common/express_custom_function")(express);

server.listen(3005, (err) => {
    if (err) throw (err);
    console.log('Server Up And Working');
});
