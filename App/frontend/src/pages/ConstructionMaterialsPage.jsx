import { Routes, Route, Link } from "react-router-dom";
import ConstructionMaterialsTable from "../components/construction_materials/ConstructionMaterialsTable";

function ConstructionMaterialsPage() {
  return (
    <div>
      <h1 className="text-center">Construction Materials</h1>
      <nav>
        <ul>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<ConstructionMaterialsTable />} />
      </Routes>
    </div>
  );
}

export default ConstructionMaterialsPage;
