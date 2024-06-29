const express = require("express");
const { getRecords, getRecordByID, createRecord, updateRecord, deleteRecord } 
= require("../controllers/generateTablePageControllers")

const generateTablePageRoutes = (table, columns) => 
  {
    const router = express.Router();
    router.get("/", getRecords(table, columns));
    router.get("/:id", getRecordByID(table, columns));
    router.post("/", createRecord(table, columns));
    router.put("/:id", updateRecord(table, columns));
    router.delete("/:id", deleteRecord(table, columns));
    return router;
  }

module.exports = generateTablePageRoutes;
