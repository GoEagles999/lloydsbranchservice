const express = require('express');
const getBranch = require('./handlers/getBranch');
const app = express();

app.get('/branch', getBranch);

module.exports = app;
