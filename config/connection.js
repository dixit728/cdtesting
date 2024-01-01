const mongoose = require('mongoose');
let config = require("../config/config.json");

mongoose.connect(config.databaseURI, { useNewUrlParser: true, useUnifiedTopology: true });

const ConnectDB = mongoose.connection;

module.exports = ConnectDB;