import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar/NavBar";
import axios from 'axios';

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
            newTableColumnList[prevTable].push(response.data[i]);
          } else {
            newTableColumnList[prevTable] = [response.data[i]];
          }
        }
        setTableColumnList(newTableColumnList);
        console.log("finished with column list")
      } catch (error) {
        alert("Error fetching DB info from the server.");
        console.error("Error fetching DB info:", error);
      }
    };

    fetchDBInfo();
  }, []);

  const loadComponent = (componentName) => {
    return lazy(() => import(`./pages/${componentName}Page`));
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {Object.keys(tableColumnList).map((table) => {
            const pageName = table.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
            const DynamicComponent = loadComponent(pageName);
            return (
              <Route
                key={table}
                path={`/${table}/*`}
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <DynamicComponent rows={tableColumnList[table]} />
                  </Suspense>
                }
              />
            );
          })}
        </Routes>
      </div>
    </div>
  );
}

export default App;