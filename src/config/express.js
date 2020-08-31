const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const consign = require('consign');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

consign({cwd: 'src'})
    .include('/app/api')
    .then('/config/database.js')
    .then('/app/routes')
    .into(app)

module.exports = app
