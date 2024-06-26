import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./ConstructionMaterialTableRow";
import axios from "axios";

const ConstructionMaterialsTable = (props) => {

  const [materials, setMaterials] = useState([]);
  const [formData, setFormData] = useState({ item: "" });

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

  const resetFormFields = () => {
    setFormData({
      item: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new material object from the form data
    const newMaterial = {
      item: formData.item
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "construction_materials";
      const response = await axios.post(URL, newMaterial);
      if (response.status === 201) {
        fetchMaterials();
      } else {
        alert("Error creating construction material");
      }
    } catch (error) {
      alert("Error creating construction material");
      console.error("Error creating construction material:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  return (
    <div className="grid place-items-center">
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
      <h2>Create New Construction Material</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="item">Item Name</label>
        <input className="border"
          type="text"
          name="item"
          value={formData.item}
          onChange={handleInputChange}
        />
        <button type="submit">Create Construction Material</button>
      </form>
    </div>
  );
};

export default ConstructionMaterialsTable;
