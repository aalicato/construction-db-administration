import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateConstructionMaterial = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(useParams(), location.state);
  const prevConstructionMaterial = location.state.material;

  const [formData, setFormData] = useState({
    item: prevConstructionMaterial.item || ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate(){
    // Check if formData is equal to prevConstructionMaterial
    if (JSON.stringify(formData) === JSON.stringify({
      item: prevConstructionMaterial.item || ''
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevConstructionMaterial
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "construction_materials/" + id;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating construction material");
        } else {
          alert(response.data.message);
          // Redirect to construction_materials page
          navigate("/construction_materials");
        }
      } catch (err) {
        console.log("Error updating construction material:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update Construction Material</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item:</label>
          <input
            type="text"
            name="item"
            onChange={handleInputChange}
            required
            defaultValue={prevConstructionMaterial.item}
          />
        </div>
        <button type="button" onClick={() => navigate("/construction_materials")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateConstructionMaterial;

