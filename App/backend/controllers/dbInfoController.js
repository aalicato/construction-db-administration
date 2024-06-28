const db = require("../database/config");
require("dotenv").config();

const getDBInfo = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_KEY FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'cs340_licatoa';");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching the DB info:", error);
        res.status(500).json({ error: error.message });
    }
};

const fetchDBInfoServer = async () => {
    dbInfoQuery = `SELECT 
            t.TABLE_NAME AS tableName,
            GROUP_CONCAT(CASE 
                            WHEN kcu.CONSTRAINT_NAME IS NULL THEN c.COLUMN_NAME
                            ELSE NULL 
                        END ORDER BY c.ordinal_position SEPARATOR ', ') AS columns,
            MAX(CASE 
                    WHEN kcu.CONSTRAINT_NAME IS NOT NULL THEN c.COLUMN_NAME
                    ELSE NULL 
                END) AS primaryKeyColumn
        FROM 
            INFORMATION_SCHEMA.TABLES t
        JOIN 
            INFORMATION_SCHEMA.COLUMNS c
        ON 
            t.TABLE_SCHEMA = c.TABLE_SCHEMA
            AND t.TABLE_NAME = c.TABLE_NAME
        LEFT JOIN 
            INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
        ON 
            c.TABLE_SCHEMA = kcu.TABLE_SCHEMA
            AND c.TABLE_NAME = kcu.TABLE_NAME
            AND c.COLUMN_NAME = kcu.COLUMN_NAME
            AND kcu.CONSTRAINT_NAME = 'PRIMARY'
        WHERE 
            t.TABLE_SCHEMA = 'cs340_licatoa'
            AND t.TABLE_TYPE = 'BASE TABLE'
        GROUP BY 
            t.TABLE_NAME;`
    try {
        const rows = await db.query(dbInfoQuery);
        return rows;
    } catch (error) {
        console.error("Error fetching initial database info for server:", error)
    }
}

// Export the functions as methods of an object
module.exports = {
    getDBInfo,
    fetchDBInfoServer
};
