const express = require("express");
const router = express.Router();
const {
    getDBInfo
} = require("../controllers/dbInfoController");

router.get("/", getDBInfo);

module.exports = router;