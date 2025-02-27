const express = require("express");
const cors = require("cors");
require("dotenv").config();
const tableAgnosticRouter = require("./routes/tableAgnosticRoutes");
const generateTablePageRoutes = require("./routes/generateTablePageRoutes");
const fetchDBInfoServer = require("./utils/fetchDBInfoServer");

fetchDBInfoServer().then(
  (tables) => {
    const tableColumns = {};
    let prevTable = null;

    tables[0].map((table) => {
      prevTable =
        table["TABLE_NAME"] === prevTable ? prevTable : table["TABLE_NAME"];
      if (tableColumns[prevTable]) tableColumns[prevTable].push(table);
      else tableColumns[prevTable] = [table];
    });
    console.log(tableColumns);
    initServer(tableColumns);
  },
  () => console.error("Error fetching DB info to initialize server"),
);

function initServer(tableColumns) {
  const app = express();
  const PORT = process.env.PORT || 8500;

  // Middleware:
  app.use(cors({ credentials: true, origin: "*" }));
  app.use(express.json());

  // API Routes for backend CRUD:
  app.use("/api/misc", tableAgnosticRouter);
  Object.keys(tableColumns).map((table) => {
    const parentTables = [];
    app.use(
      `/api/${table}`,
      generateTablePageRoutes(table, tableColumns[table]),
    );
  });

  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}...`);
  });
}
