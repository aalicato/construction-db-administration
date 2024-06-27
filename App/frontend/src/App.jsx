import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar/NavBar";
import axios from 'axios';
import TablePage from "./pages/TablePage"

function App() {
  const [tableColumnList, setTableColumnList] = useState({});

  useEffect(() => {
    const fetchDBInfo = async () => {
      try {
        const URL = import.meta.env.VITE_API_URL + "dbinfo";
        const response = await axios.get(URL);
        const tableColumns = response.data;
        console.log("Here's the response for DB info: " + tableColumns)
        const newTableColumnList = {};
        let prevTable = null;
        
        tableColumns.map( (row) => {
          prevTable = (row["TABLE_NAME"] === prevTable) ? prevTable : row["TABLE_NAME"];
          if (newTableColumnList[prevTable]) newTableColumnList[prevTable].push(row);
          else newTableColumnList[prevTable] = [row];
        })

        setTableColumnList(newTableColumnList);
        console.log("Finished building tablecolumnlist. Here's the first row: " + tableColumnList["constructions"])
      } catch (error) {
        alert("Error fetching DB info from the server.");
        console.error("Error fetching DB info:", error);
      }
    };

    fetchDBInfo();
  }, []);

  return (
    <div>
      <div>
        <Navbar tables={Object.keys(tableColumnList)}/>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {Object.keys(tableColumnList).map((table) => {
            return (
              <Route
                key={table}
                path={`/${table}/*`}
                element={<TablePage rows={tableColumnList[table]} />}
              />
            );
          })}
        </Routes>
      </div>
    </div>
  );
}

export default App;