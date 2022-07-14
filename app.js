const express = require('express');
const getBranch = require('./handlers/getBranch');
const app = express();

app.get('/branch', getBraanch);

module.exports = app;
