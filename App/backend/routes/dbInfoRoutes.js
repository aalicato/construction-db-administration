const express = require("express");
const DBInfoRouter = express.Router();
const { getDBInfo, fetchDBInfoServer } = require("../controllers/dbInfoController")

DBInfoRouter.get("/", getDBInfo);

// DB info function for server doesn't need route -- only gets called once on server startup
module.exports = { DBInfoRouter, fetchDBInfoServer };