const db = require("../database/config");
require("dotenv").config();

// Gets db table/column details to for dynamic frontend generation
const getDBInfo = async (req, res) => {
    try {
        const rows = await db.query(`SELECT TABLE_NAME, COLUMN_NAME, COLUMN_COMMENT, IS_NULLABLE, COLUMN_KEY FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE();
        SELECT 
            kcu.TABLE_NAME AS REFERENCING_TABLE,
            kcu.COLUMN_NAME AS REFERENCING_COLUMN,
            kcu.REFERENCED_TABLE_NAME AS REFERENCED_TABLE,
            kcu.REFERENCED_COLUMN_NAME AS REFERENCED_COLUMN
        FROM 
            information_schema.KEY_COLUMN_USAGE kcu
        WHERE 
            kcu.REFERENCED_TABLE_SCHEMA = DATABASE()
            AND kcu.REFERENCED_TABLE_NAME IS NOT NULL;`);
	    console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching the DB info:", error);
        res.status(500).json({ error: error.message });
    }
};

// Creates function that returns all rows for given table, but for a specific column
const getRecordsByColumn = async (req, res) => {
    try {
        console.log(req.body);
        const column = req.body[0];
        const table = req.body[1];
      // Select all rows from the table
      const query = `SELECT ?? FROM ??`;
      // Execute the query using the "db" object from the configuration file
      const [rows] = await db.query(query, [column, table]);
      // Send back the rows to the client
      res.status(200).json({[column]: rows});
    } catch (error) {
      console.error(`Error fetching records from the database:`, error);
      res.status(500).json({ error: `Error fetching records for this table and column` });
    }
  };

// Reruns DDL
const resetDB = async (req, res) => {
    try {
        const rows = await db.query()
    } catch (error)
    {}
}
// Export the functions as methods of an object
module.exports = {
    getDBInfo,
    getRecordsByColumn
};
