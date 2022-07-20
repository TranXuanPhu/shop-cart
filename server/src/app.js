const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//NOTE:
const routers = require('./routers/router.js');

//NOTE: setting static file
app.use(express.static(path.join(__dirname, 'public')));

//NOTE: app use
app.use(cors({ credentials: true })); //Để bật cookie HTTP qua CORS
app.use(cookieParser());
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//NOTE: routers
routers(app);

module.exports = app;
