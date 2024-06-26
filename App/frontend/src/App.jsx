import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar/NavBar";
import ConstructionMaterialsPage from "./pages/ConstructionMaterialsPage";
import axios from 'axios'

function App() {

  const [tableColumnList, setTableColumnList] = useState({});

  useEffect(() => {
    const fetchDBInfo = async () => {
      try {
        const URL = import.meta.env.VITE_API_URL + "dbinfo";
        const response = await axios.get(URL);
        const newTableColumnList = {};
        let prevTable = null;

        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i]["TABLE_NAME"] !== prevTable) {
            prevTable = response.data[i]["TABLE_NAME"];
          }
          if (newTableColumnList[prevTable]) {
            newTableColumnList[prevTable].push(response.data[i])
          } else {
            newTableColumnList[prevTable] = [response.data[i]]
          }
        }
        setTableColumnList(newTableColumnList);
      } catch (error) {
        alert("Error fetching construction materials from the server.");
        console.error("Error fetching constructon materials:", error);
      }
    };

    fetchDBInfo();
  }, []); // Empty dependency array ensures this runs only once after the initial render.

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {Object.keys(tableColumnList).map((table) => (
            <Route key={table} path={`/${table}/*`} element={<ConstructionMaterialsPage />} />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default App;
