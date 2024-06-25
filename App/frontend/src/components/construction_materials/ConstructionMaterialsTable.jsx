import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./ConstructonMaterialTableRow";
import axios from "axios";

const ConstructionMaterialsTable = () => {
  const [materials, setMaterials] = useState([]);

  const fetchMaterials = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "construction_materials";
      const response = await axios.get(URL);
      setMaterials(response.data);
    } catch (error) {
      alert("Error fetching construction materials from the server.");
      console.error("Error fetching constructon materials:", error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div>
      <h2>Construction Materials Table</h2>
      {materials.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No construction materials found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Item</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <TableRow key={material.material_id} material={material} fetchMaterials={fetchMaterials} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ConstructionMaterialsTable;
