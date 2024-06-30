const db = require("../database/config");
require("dotenv").config();

const getDBInfo = async (req, res) => {
    try {
        const rows = await db.query(`SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, COLUMN_COMMENT, IS_NULLABLE, COLUMN_KEY FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE();
        SELECT 
            kcu.TABLE_NAME AS REFERENCING_TABLE,
            kcu.COLUMN_NAME AS REFERENCING_COLUMN,
            kcu.REFERENCED_TABLE_NAME AS REFERENCED_TABLE,
            CONCAT(kcu.REFERENCED_TABLE_NAME, '.', kcu.REFERENCED_COLUMN_NAME) AS REFERENCED_COLUMN
        FROM 
            information_schema.KEY_COLUMN_USAGE kcu
        WHERE 
            kcu.REFERENCED_TABLE_SCHEMA = DATABASE()
            AND kcu.REFERENCED_TABLE_NAME IS NOT NULL;`);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching the DB info:", error);
        res.status(500).json({ error: error.message });
    }
};

const resetDB = async (req, res) => {
    try {
        const rows = await db.query()
    } catch (error)
    {}
}
// Export the functions as methods of an object
module.exports = {
    getDBInfo
};
