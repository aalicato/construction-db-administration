import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar/NavBar";
import axios from 'axios';
import TablePage from "./pages/TablePage"

function App() {
  const [tablesColumns, setTablesColumns] = useState({});

  const fetchDBInfo = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "dbinfo";
      const response = await axios.get(URL);
      console.log(response);
      const tableColumns = response.data[0][0];
      const newtablesColumns = {};
      let prevTable = null;
      
      tableColumns.map( (row) => {
        prevTable = (row["TABLE_NAME"] === prevTable) ? prevTable : row["TABLE_NAME"];
        if (newtablesColumns[prevTable]) newtablesColumns[prevTable].push(row);
        else newtablesColumns[prevTable] = [row];
      })

      setTablesColumns(newtablesColumns);
    } catch (error) {
      alert("Error fetching DB info from the server.");
      console.error("Error fetching DB info:", error);
    }
  };

  useEffect(() => {
    fetchDBInfo();
  }, []);

  return (
    <div>
      <div>
        <Navbar tables={Object.keys(tablesColumns)}/>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {Object.keys(tablesColumns).map((table) => {
            return (
              <Route
                key={table}
                path={`/${table}/*`}
                element={<TablePage rows={tablesColumns[table]} />}
              />
            );
          })}
        </Routes>
      </div>
    </div>
  );
}

export default App;