const express = require("express");
const cors = require("cors");
const { DBInfoRouter, fetchDBInfoServer } = require("./routes/dbInfoRoutes")
const generateTablePageRoutes = require("./routes/generateTablePageRoutes")
require("dotenv").config();

fetchDBInfoServer().then(rows => {
  initServer(rows);
  }, 
  () => console.error("Error fetching DB info to initialize server")
);

function initServer(DBInfo) {
    const app = express();
    const PORT = process.env.PORT || 8500;
    console.log(DBInfo[0]);

    // Middleware:
    app.use(cors({ credentials: true, origin: "*" }));
    app.use(express.json());

    // API Routes for backend CRUD:
    app.use("/api/dbinfo", DBInfoRouter);
    DBInfo[0].map((row) => {
      app.use(`/api/${row["tableName"]}`, generateTablePageRoutes(row["tableName"], row["columns"], row["primaryKeyColumn"]))
    })

    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}...`);
    });
}