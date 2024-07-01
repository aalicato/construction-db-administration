import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./TableRow";
import axios from "axios";

const Table = ( {rows} ) => {

  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({});

  const fetchRecords = async () => {
    try {
      const recordsURL = import.meta.env.VITE_API_URL + rows[0][0]["TABLE_NAME"];
      const dropdownsURL = import.meta.env.VITE_API_URL + "misc/get_column";
      const responseRec = await axios.get(recordsURL);
      console.log(rows[1])
      if (rows[1].length == 0) setRecords (responseRec.data, []);
      else {
        const responseDrop = rows[1].map((row) => {
          await axios.post(dropdownsURL, [row["REFERENCED_COLUMN"], row["REFERENCED_TABLE"]])
        });
      console.log("Fetched records, including for dropdowns:", responseRec, responseDrop)
      setRecords(responseRec.data, responseDrop.data);
      }
    } catch (error) {
      alert("Error fetching records from the server.");
      console.error("Error fetching records:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
    if (rows[0].length > 0) {
      const initialFormData = rows[0].reduce((accumulator, currentObject) => {
        accumulator[currentObject["COLUMN_NAME"]] = "";
        return accumulator;
      }, {});
      setFormData(initialFormData);
    }
  }, [rows[0]]);

  const resetFormFields = () => {
    setFormData( rows[0].slice(1).reduce((accumulator, currentObject) => {
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
    const newRecord = rows[0].slice(1).reduce((accumulator, currentObject) => {
      accumulator[currentObject["COLUMN_NAME"]] = formData[currentObject["COLUMN_NAME"]];
      return accumulator;
    }, {});
    console.log("New record to be created:", newRecord);
    try {
      const URL = import.meta.env.VITE_API_URL + rows[0][0]["TABLE_NAME"];
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

  const formType = (columnType) => {
    if (columnType === "date") return "date";
    return "text";
  };

  return (
    <div className="grid place-items-center h-screen">
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
              {rows[0].slice(1).map((row) => (
                <th key={row["COLUMN_NAME"]} >{row["COLUMN_NAME"]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <TableRow key={index} record={record} fetchRecords={fetchRecords} rows={rows}/>
            ))}
          </tbody>
        </table>
      )}
      <h2 className="mt-5 mb-2 text-xl">Create New Record</h2>
      <form onSubmit={handleSubmit}>
        {rows[0].slice(1).map( (row) => {
          const columnName = row["COLUMN_NAME"]
          // if (row["COLUMN_KEY"] === "MUL") {
          //   <div key={columnName}>
          //   <label htmlFor={columnName}>{columnName}</label>
          //   <select id={`create${row["COLUMN_KEY"]}`}>
          //     <
          //   </select>
          //   </div>
          // }
          return (
          <div key={columnName}>
          <label htmlFor={columnName}>{columnName}</label>
          <input className="border"
            key={columnName}
            type={formType(row["COLUMN_COMMENT"])}
            name={columnName}
            value={formData.columnName}
            onChange={handleInputChange}
          />
          </div>
          )
        }
        )}
        
        <button type="submit">Create Record</button>
      </form>
    </div>
  );
};

export default Table;
