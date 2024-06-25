import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateConstructionMaterial() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({item: ""});
  
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
        navigate("/construction_materials");
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

  return (
    <>
      <h2>Create Construction Material</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="item">Item Name</label>
        <input
          type="text"
          name="item"
          defaultValue={formData.item}
          onChange={handleInputChange}
        />
        <button type="submit">Create Construction Material</button>
      </form>
    </>
  );
}

export default CreateConstructionMaterial;
