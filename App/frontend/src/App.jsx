import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar/NavBar";
import axios from "axios";
import TablePage from "./pages/TablePage";

function App() {
  const [tableInfo, setTableInfo] = useState([]);

  const fetchDBInfo = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "misc";
      const response = await axios.get(URL);
      const newTableInfo = {};
      let prevTable = null;

      response.data[0][0].map((row) => {
        prevTable =
          row["TABLE_NAME"] === prevTable ? prevTable : row["TABLE_NAME"];
        if (newTableInfo[prevTable]) newTableInfo[prevTable][0].push(row);
        else newTableInfo[prevTable] = [[row], []];
      });

      response.data[0][1].map((referencingRow) => {
        newTableInfo[referencingRow["REFERENCING_TABLE"]][1].push(
          referencingRow,
        );
      });
      console.log(newTableInfo);
      setTableInfo(newTableInfo);
    } catch (error) {
      alert("Error fetching DB info from the server.");
      console.error("Error fetching DB info:", error);
    }
  };

  useEffect(() => {
    fetchDBInfo();
  }, []);

  return (
    <div className="flex w-full h-screen">
      <div className="w-72 flex flex-col bg-gray-900 text-white shadow-lg items-center fixed top-0 left-0 h-screen">
        <Navbar tables={Object.keys(tableInfo)} />
      </div>
      <div className="ml-72 p-4 flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {Object.keys(tableInfo).map((table) => {
            return (
              <Route
                key={table}
                path={`/${table}/*`}
                element={<TablePage rows={tableInfo[table]} />}
              />
            );
          })}
        </Routes>
      </div>
    </div>
  );
}

export default App;
