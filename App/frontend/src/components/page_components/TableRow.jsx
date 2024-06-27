import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

const TableRow = ({ record, fetchRecords, rows }) => {
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState( {} );

  useEffect(() => {
    const initialFormData = rows.slice(1).reduce((accumulator, currentObject) => {
      accumulator[currentObject["COLUMN_NAME"]] = record[currentObject["COLUMN_NAME"]] || "";
      return accumulator;
    }, {});
    setFormData(initialFormData);
    console.log("At the end of TableRow's useEffect, formData: " + formData)
    }, [record, rows]);

    const handleEdit = () => {
    setEditable(true);
    };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
    }

  const handleUpdate = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + rows[0]["TABLE_NAME"] + "/" + record[rows[0]["COLUMN_NAME"]];
      console.log(formData);
      const response = await axios.put(URL, formData);
      if (response.status === 200) {
        setEditable(false); // Turn off edit mode on successful update
        fetchRecords(); // Refresh records
      } else {
        console.log("Error updating record.")
      }
    } catch (err) {
      alert("Error updating record.");
      console.log(err);
    }
  };

  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + rows[0]["TABLE_NAME"] + "/" + record[rows[0]["COLUMN_NAME"]];
      const response = await axios.delete(URL);
      if (response.status === 204) {
        fetchRecords();
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting construction material");
      console.log(err);
    }
  };

  return (
    <tr className="text-l" key={record[rows[0]["COLUMN_NAME"]]}>
      {editable ? (
        <>
          <td>{record[rows[0]["COLUMN_NAME"]]}</td>
          {
            rows.slice(1).map((row) => {
                console.log("Setting default values for input to " + formData[row["COLUMN_NAME"]])
                return (
                <td>
                <input
                key={row["COLUMN_NAME"]}
                type="text"
                name={row["COLUMN_NAME"]}
                onChange={handleInputChange}
                required
                defaultValue={formData[row["COLUMN_NAME"]]}
                />
                </td>
                )
                }
            )
          }
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
          {
            Object.values(record).map((value, index) => {
            return (<td key={index}>{value}</td>)
            })
          }
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