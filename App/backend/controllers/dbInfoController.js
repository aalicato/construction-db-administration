const db = require("../database/config");
require("dotenv").config();

const getDBInfo = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, COLUMN_COMMENT, IS_NULLABLE, COLUMN_KEY FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'cs340_licatoa';");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching the DB info:", error);
        res.status(500).json({ error: error.message });
    }
};

// Export the functions as methods of an object
module.exports = {
    getDBInfo
};
