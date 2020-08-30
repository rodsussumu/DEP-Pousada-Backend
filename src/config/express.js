const express = require('express');
const bodyParser = require('body-parser')
const consign = require('consign')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

consign({cwd: process.cwd()})
    .then('/src/config/database.js')
    .then('/src/app/api')
    .then('/src/app/routes')
    .into(app)

module.exports = app
