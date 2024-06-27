import { Routes, Route, Link } from "react-router-dom";
import Table from "../components/construction_materials/Table";

function ConstructionMaterialsPage( props ) {
  console.log("On page the rows look like this: " + props.rows[0]["TABLE_NAME"]);
  return (
    <div>
      <h1 className="text-center">Construction Materials</h1>
      <nav>
        <ul>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Table rows={props.rows}/>} />
      </Routes>
    </div>
  );
}

export default ConstructionMaterialsPage;
