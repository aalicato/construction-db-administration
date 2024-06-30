const db = require("../database/config");
require("dotenv").config();

const fetchDBInfoServer = async () => {
    dbInfoQuery = "SELECT TABLE_NAME, COLUMN_NAME, COLUMN_COMMENT, IS_NULLABLE, COLUMN_KEY FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE();"
    try {
        const rows = await db.query(dbInfoQuery);
        return rows;
    } catch (error) {
        console.error("Error fetching initial database info for server:", error)
    }
}

module.exports = fetchDBInfoServer;