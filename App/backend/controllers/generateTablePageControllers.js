// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Creates function that returns all rows for given table
const getRecords = (tableName) => (
  async (req, res) => {
  try {
    // Select all rows from the table
    const query = `SELECT * FROM ${tableName}`;
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error(`Error fetching ${tableName} records from the database:`, error);
    res.status(500).json({ error: `Error fetching records for ${tableName}` });
  }
});

// Creates func that returns a single record from target table by id
const getRecordByID = (tableName, primaryKeyColumn) => (
  async (req, res) => {
  try {
    const primaryKeyValue = req.params[primaryKeyColumn];
    const query = `SELECT * FROM ${tableName} WHERE ${primaryKeyColumn} = ?`;
    const [result] = await db.query(query, [primaryKeyValue]);
    // Check if record was found
    if (result.length === 0) {
      return res.status(404).json({ error: "Record was not found" });
    }
    const record = result[0];
    res.json(record);
  } catch (error) {
    console.error("Error fetching record from the database:", error);
    res.status(500).json({ error: "Error fetching record" });
  }
});

// Creates function that creates a record in target table
const createRecord = (tableName, columns) => (
  async (req, res) => {
  try {
    const columnsValues = {};
    columns.forEach(column => {
      columnsValues[column] = req.body[column];
    });
    const questionMarks = new Array(columns.length).fill("?");
    let query = `INSERT INTO ${tableName} (${columnsValues.join(", ")}) VALUES (${questionMarks.join(", ")});`;
    const response = await db.query(query, [Object.values(columnsValues)]);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating record:", error);
    res.status(500).json({ error: "Error creating record" });
  }
});

// Creates function that updates a record in the target table
const updateRecord = (tableName, columns, primaryKeyColumn) => (
  async (req, res) => {
  // Get the ID
  const primaryKeyValue = req.params[primaryKeyColumn];
  // Get the new object
  const newRecord = req.body;

  try {
    const [data] = await db.query(`SELECT * FROM ${tableName} WHERE ${primaryKeyColumn} = ?`, [
      primaryKeyValue
    ]);

    const oldRecord = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newRecord, oldRecord)) {
      const query = `UPDATE ${tableName} SET ${columns.join("= ? ")} WHERE ${primaryKeyColumn}= ?`;
      
      // Add each column value for the new record, but add the primary key value to the end
      const values = columns.slice(1).map(column => (newRecord[column])).push(primaryKeyValue)

      // Perform the update
      await db.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "Record updated successfully." });
    }

    res.json({ message: "Record details are the same, no update" });
  } catch (error) {
    console.log("Error updating record", error);
    res
      .status(500)
      .json({ error: `Error updating the ${tableName} record with id ${primaryKeyValue}` });
  }
});

// Endpoint to delete a record from the database
const deleteRecord = (tableName, primaryKeyColumn) => (
  async (req, res) => {
  console.log("Deleting record with id: ", req.params[primaryKeyColumn]);
  const primaryKeyValue = req.params[primaryKeyColumn];

  try {
    // Ensure the record exists
    const [isExisting] = await db.query(
      `SELECT 1 FROM ${tableName} WHERE ${primaryKeyColumn} = ?`,
      [primaryKeyValue]
    );

    // If the record doesnt exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Record not found");
    }

    // Delete the record from the table
    await db.query(`DELETE FROM ${tableName} WHERE ${primaryKeyColumn} = ?`, [primaryKeyValue]);

    // Return the appropriate status code
    res.status(204).json({ message: "Record deleted successfully" })
  } catch (error) {
    console.error("Error deleting record from the database:", error);
    res.status(500).json({ error: error.message });
  }
});

// Export the functions as methods of an object
module.exports = {
  getRecords,
  getRecordByID,
  createRecord,
  updateRecord,
  deleteRecord
};
