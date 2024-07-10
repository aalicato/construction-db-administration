const db = require("../database/config");

// Retrieves DB structure to initialize server
const fetchDBInfoServer = async () => {
  dbInfoQuery =
    "SELECT TABLE_NAME, COLUMN_NAME, COLUMN_COMMENT, IS_NULLABLE, COLUMN_KEY FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE();";
  console.log("dbInfoQuery");
  try {
    const rows = await db.query(dbInfoQuery);
    return rows;
  } catch (error) {
    console.error("Error fetching initial database info for server:", error);
  }
};

module.exports = fetchDBInfoServer;
