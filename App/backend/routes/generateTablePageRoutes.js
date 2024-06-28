const express = require("express");
const { getRecords, getRecordByID, createRecord, updateRecord, deleteRecord } 
= require("../controllers/generateTablePageControllers")

const generateTablePageRoutes = (tableName, columns, primaryKeyColumn) => 
  {
    const router = express.Router();
    router.get("/", getRecords(tableName, primaryKeyColumn));
    router.get("/:id", getRecordByID(tableName, primaryKeyColumn));
    router.post("/", createRecord(tableName, columns));
    router.put("/:id", updateRecord(tableName, columns, primaryKeyColumn));
    router.delete("/:id", deleteRecord(tableName, primaryKeyColumn));
    return router;
  }

module.exports = generateTablePageRoutes;
