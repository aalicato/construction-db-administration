import { Routes, Route, Link } from "react-router-dom";
import CreateConstructionMaterial from "../components/construction_materials/CreateConstructionMaterial";
import ConstructionMaterialsTable from "../components/construction_materials/ConstructionMaterialsTable";
import UpdateConstructionMaterial from "../components/construction_materials/UpdateConstructionMaterial";

function ConstructionMaterialsPage() {
  return (
    <div>
      <h1>Construction Material Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/construction_materials">Construction Materials Table</Link>
          </li>
          <li>
            <Link to="/construction_materials/add">Add Construction Material</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<ConstructionMaterialsTable />} />
        <Route path="/add" element={<CreateConstructionMaterial />} />
        <Route path="/edit/:id" element={<UpdateConstructionMaterial />} />
      </Routes>
    </div>
  );
}

export default ConstructionMaterialsPage;
