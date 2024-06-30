import { Routes, Route } from "react-router-dom";
import Table from "../components/page_components/Table";

function TablePage( {rows} ) {
  return (
    <div>
      <h1 className="text-center text-3xl mt-5 mb-10">{rows[0][0]["TABLE_NAME"].split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h1>
      <Routes>
        <Route path="/" element={<Table rows={rows}/>} />
      </Routes>
    </div>
  );
}

export default TablePage;
