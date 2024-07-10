// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Creates function that returns all rows for given table
const getRecords = (table, columns) => async (req, res) => {
  try {
    // Select all rows from the table
    const query = `SELECT * FROM ${table}`;
    //console.log(query, columns);
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query, req.body);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error(`Error fetching ${table} records from the database:`, error);
    res.status(500).json({ error: `Error fetching records for ${table}` });
  }
};

// Creates func that returns a single record from target table by id
const getRecordByID = (table, columns) => async (req, res) => {
  try {
    const primaryKeyValue = req.params.id;
    const query = `SELECT * FROM ${table} WHERE ${columns[0]["COLUMN_NAME"]} = ?`;
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
};

// Creates function that creates a record in target table
const createRecord = (table, columns) => async (req, res) => {
  try {
    // console.log(req.body)
    let query = `INSERT INTO ${table} (${columns
      .slice(1)
      .map((column) => column["COLUMN_NAME"])
      .join(", ")}) VALUES (${new Array(columns.length - 1)
      .fill("?")
      .join(", ")});`;
    const response = await db.query(
      query,
      columns.slice(1).map((column) => req.body[column["COLUMN_NAME"]]),
    );
    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating record:", error);
    res.status(500).json({ error: "Error creating record" });
  }
};

// Creates function that updates a record in the target table
const updateRecord = (table, columns) => async (req, res) => {
  // Get the ID
  const primaryKeyValue = req.params.id;
  console.log("primary key value received in update:", primaryKeyValue);
  // Get the new object
  const newRecord = req.body;
  console.log("new record to extract values from:", newRecord);
  try {
    const [data] = await db.query(
      `SELECT * FROM ${table} WHERE ${columns[0]["COLUMN_NAME"]} = ?`,
      [primaryKeyValue],
    );
    const oldRecord = data[0];
    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newRecord, oldRecord)) {
      const query = `UPDATE ${table} SET ${columns
        .slice(1)
        .map((column) => column["COLUMN_NAME"])
        .join(" = ?, ")} = ? WHERE ${columns[0]["COLUMN_NAME"]} = ?`;

      // Add each column value for the new record, but add the primary key value to the end
      const values = columns
        .slice(1)
        .map((column) => newRecord[column["COLUMN_NAME"]]);
      values.push(primaryKeyValue);
      console.log("values to be passed to the update query:", values);

      // Perform the update
      await db.query(query, values);
      // Inform client of success and return
      return res.json({ message: "Record updated successfully." });
    }

    res.json({ message: "Record details are the same, no update" });
  } catch (error) {
    console.log("Error updating record", error);
    res.status(500).json({
      error: `Error updating the ${table} record with id ${primaryKeyValue}`,
    });
  }
};

// Endpoint to delete a record from the database
const deleteRecord = (table, columns) => async (req, res) => {
  console.log(`Deleting record from ${table} with id:`, req.params.id);
  const primaryKeyValue = req.params.id;

  try {
    // Ensure the record exists
    const [isExisting] = await db.query(
      `SELECT 1 FROM ${table} WHERE ${columns[0]["COLUMN_NAME"]} = ?`,
      [primaryKeyValue],
    );

    // If the record doesnt exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Record not found");
    }

    // Delete the record from the table
    await db.query(
      `DELETE FROM ${table} WHERE ${columns[0]["COLUMN_NAME"]} = ?`,
      [primaryKeyValue],
    );

    // Return the appropriate status code
    res.status(204).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting record from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getRecords,
  getRecordByID,
  createRecord,
  updateRecord,
  deleteRecord,
};
