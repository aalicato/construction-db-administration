const express = require("express");
const miscRouter = express.Router();
const { getDBInfo, getRecordsByColumn } = require("../controllers/tableAgnosticController")

miscRouter.post("/get_column", getRecordsByColumn);
miscRouter.get("/", getDBInfo);

// DB info function for server doesn't need route -- only gets called once on server startup
module.exports = miscRouter;