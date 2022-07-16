const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

//NOTE:
const routers = require('./routers/router.js');

//NOTE: setting static file
app.use(express.static(path.join(__dirname, 'public')));

//NOTE: app use
app.use(cors()); // to allow cross origin requests
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//NOTE: routers
routers(app);

module.exports = app;
