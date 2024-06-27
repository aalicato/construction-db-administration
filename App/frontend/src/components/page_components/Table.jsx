import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./TableRow";
import axios from "axios";

const Table = ( {rows} ) => {

  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({});

  const fetchRecords = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + rows[0]["TABLE_NAME"];
      const response = await axios.get(URL);
      setRecords(response.data);
    } catch (error) {
      alert("Error fetching records from the server.");
      console.error("Error fetching records:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
    if (rows.length > 0) {
      const initialFormData = rows.reduce((accumulator, currentObject) => {
        accumulator[currentObject["COLUMN_NAME"]] = "";
        return accumulator;
      }, {});
      setFormData(initialFormData);
    }
  }, [rows]);

  const resetFormFields = () => {
    setFormData( rows.slice(1).reduce((accumulator, currentObject) => {
      accumulator[currentObject["COLUMN_NAME"]] = "";
      return accumulator;
    }, {}) );
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
    const newRecord = rows.slice(1).reduce((accumulator, currentObject) => {
      accumulator[currentObject["COLUMN_NAME"]] = formData[currentObject["COLUMN_NAME"]];
      return accumulator;
    }, {});

    try {
      const URL = import.meta.env.VITE_API_URL + rows[0]["TABLE_NAME"];
      const response = await axios.post(URL, newRecord);
      if (response.status === 201) {
        fetchRecords();
      } else {
        alert("Error creating new record");
      }
    } catch (error) {
      alert("Error creating record");
      console.error("Error creating record:", error);
    }
    resetFormFields();
  };

  return (
    <div className="grid place-items-center">
      {records.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No records found.</p>
        </div>
      ) : (
        <table className="table-auto border-separate border border-spacing-2 shadow-lg">
          <thead>
            <tr className="border border-indigo-600">
              <th>ID</th>
              {rows.slice(1).map((row) => (
                <th>{row["COLUMN_NAME"]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <TableRow key={record[rows[0]["COLUMN_NAME"]]} record={record} fetchRecords={fetchRecords} rows={rows}/>
            ))}
          </tbody>
        </table>
      )}
      <h2 className="mt-5 mb-2 text-xl">Create New Record</h2>
      <form onSubmit={handleSubmit}>
        {rows.slice(1).map( (row) => {
          const columnName = row["COLUMN_NAME"]
          return (
          <>
          <label htmlFor={columnName}>{columnName}</label>
          <input className="border"
            key={columnName}
            type="text"
            name={columnName}
            value={formData.columnName}
            onChange={handleInputChange}
          />
          </>
          )
        }
        )}
        
        <button type="submit">Create Record</button>
      </form>
    </div>
  );
};

export default Table;