import React, { useState } from "react";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

const TableRow = ({ material, fetchMaterials }) => {
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    item: material.item || ''
  });

  const handleEdit = () => {
    setEditable(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "construction_materials/" + material.material_id;
      const response = await axios.put(URL, formData);
      if (response.status === 200) {
        setEditable(false); // Turn off edit mode on successful update
        fetchMaterials(); // Refresh materials
      }
    } catch (err) {
      alert(err.response.data.error || "Error updating construction material");
      console.log(err);
    }
  };

  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "construction_materials/" + material.material_id;
      const response = await axios.delete(URL);
      if (response.status === 204) {
        fetchMaterials();
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting construction material");
      console.log(err);
    }
  };

  return (
    <tr className="" key={material.material_id}>
      {editable ? (
        <>
          <td>{material.material_id}</td>
          <td>
            <input
              type="text"
              name="item"
              onChange={handleInputChange}
              required
              defaultValue={material.item}
            />
          </td>
          <td>
            <button type="button" onClick={() => setEditable(false)}>
              Cancel
            </button>
          </td>
          <td>
            <button onClick={handleUpdate}>Update</button>
          </td>
        </>
      ) : (
        <>
          <td>{material.material_id}</td>
          <td>{material.item}</td>
          <td>
            <BiEditAlt onClick={handleEdit} size={25} style={{ cursor: "pointer" }} />
          </td>
          <td>
            <BsTrash onClick={deleteRow} size={25} style={{ cursor: "pointer" }} />
          </td>
        </>
      )}
    </tr>
  );
};

export default TableRow;