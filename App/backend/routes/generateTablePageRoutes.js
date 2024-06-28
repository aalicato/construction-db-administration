const express = require("express");
const router = express.Router();
const { getRecords, getRecordByID, createRecord, updateRecord, deleteRecord } 
= require("../controllers/generateControllers")

const generateRoutes = (tableName, columns, primaryKeyColumn) => 
  {
    router.get("/", getRecords(tableName, primaryKeyColumn));
    router.get("/:id", getRecordByID(tableName, primaryKeyColumn));
    router.post("/", createRecord(tableName, columns));
    router.put("/:id", updateRecord(tableName, columns, primaryKeyColumn));
    router.delete("/:id", deleteRecord(tableName, primaryKeyColumn));
  }

module.exports = router;
