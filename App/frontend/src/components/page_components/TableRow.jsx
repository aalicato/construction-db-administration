import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

const TableRow = ({ record, dropdownRecords, fetchRecords, rows }) => {
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({});

  const initFormData = () => {
    if (!editable) {
      const initialFormData = rows[0]
        .slice(1)
        .reduce((accumulator, currentObject) => {
          accumulator[currentObject["COLUMN_NAME"]] =
            record[currentObject["COLUMN_NAME"]] || "";
          return accumulator;
        }, {});
      console.log("Form data initialized. Here's the record:", record);
      setFormData(initialFormData);
    }
  };

  useEffect(() => {
    initFormData();
  }, [record, rows[0]]);

  const handleEdit = (state) => {
    if (state) setEditable(true);
    else {
      setEditable(false);
      initFormData();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const URL =
        import.meta.env.VITE_API_URL +
        rows[0][0]["TABLE_NAME"] +
        "/" +
        record[rows[0][0]["COLUMN_NAME"]];
      console.log(formData);
      const response = await axios.put(URL, formData);
      if (response.status === 200) {
        setEditable(false); // Turn off edit mode on successful update
        fetchRecords(); // Refresh record
      } else {
        console.log("Error updating record.");
      }
    } catch (err) {
      alert("Error updating record.");
      console.log(err);
    }
  };

  const deleteRow = async () => {
    try {
      const URL =
        import.meta.env.VITE_API_URL +
        rows[0][0]["TABLE_NAME"] +
        "/" +
        record[rows[0][0]["COLUMN_NAME"]];
      const response = await axios.delete(URL);
      if (response.status === 204) {
        fetchRecords();
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting record");
      console.log(err);
    }
  };

  return (
    <tr className="text-l" key={record[rows[0][0]["COLUMN_NAME"]]}>
      {editable ? (
        <>
          <td>{record[rows[0][0]["COLUMN_NAME"]]}</td>
          {rows[0].slice(1).map((row) => {
            console.log(
              "Setting default values for input to " +
                formData[row["COLUMN_NAME"]],
            );
            const required = row["IS_NULLABLE"];
            if (row["COLUMN_KEY"] === "MUL") {
              return (
                <td>
                  <select
                    name={row["COLUMN_NAME"]}
                    onChange={handleInputChange}
                    defaultValue={formData[row["COLUMN_NAME"]]}
                    required={required === "YES" ? true : false}
                  >
                    {dropdownRecords[row["COLUMN_NAME"]].map(
                      (option, index) => (
                        <option key={index} value={option[row["COLUMN_NAME"]]}>
                          {option[row["COLUMN_NAME"]]}
                        </option>
                      ),
                    )}
                  </select>
                </td>
              );
            }
            var inputType = "text";
            var pattern = ".*";
            switch (row["COLUMN_COMMENT"]) {
              case "price":
                pattern = "d+(.d+)?";
              case "phone":
                inputType = "tel";
                pattern = "(+d{1,2}s?)?((d{3})s?|d{3}[-.s]?)?d{3}[-.s]?d{4}";
              case "date":
                inputType = "date";
              case "email":
                inputType = "email";
            }
            return (
              <td>
                <input
                  key={row["COLUMN_NAME"]}
                  type={inputType}
                  name={row["COLUMN_NAME"]}
                  onChange={handleInputChange}
                  required={required === "YES" ? true : false}
                  defaultValue={formData[row["COLUMN_NAME"]]}
                  pattern={pattern}
                />
              </td>
            );
          })}
          <td>
            <button type="button" onClick={() => handleEdit(false)}>
              Cancel
            </button>
          </td>
          <td>
            <button onClick={handleUpdate}>Update</button>
          </td>
        </>
      ) : (
        <>
          {rows[0].map((row, index) => {
            let value = record[row["COLUMN_NAME"]];
            if (row["COLUMN_COMMENT"] === "price") value = "$" + value;
            if (value && row["COLUMN_COMMENT"] === "date")
              value =
                value.slice(5, 7) +
                "/" +
                value.slice(8, 10) +
                "/" +
                value.slice(0, 4);
            return <td key={index}>{value}</td>;
          })}
          <td>
            <BiEditAlt
              onClick={() => handleEdit(true)}
              size={25}
              style={{ cursor: "pointer" }}
            />
          </td>
          <td>
            <BsTrash
              onClick={deleteRow}
              size={25}
              style={{ cursor: "pointer" }}
            />
          </td>
        </>
      )}
    </tr>
  );
};

export default TableRow;
