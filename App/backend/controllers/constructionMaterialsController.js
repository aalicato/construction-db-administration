// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of construction_materials
const getConstructionMaterials = async (req, res) => {
  try {
    // Select all rows from the table
    const query = "SELECT * FROM construction_materials";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching construction materials from the database:", error);
    res.status(500).json({ error: "Error fetching construction materials" });
  }
};

// Returns a single construction material by id
const getConstructionMaterialByID = async (req, res) => {
  try {
    const material_id = req.params.material_id;
    const query = "SELECT * FROM construction_materials WHERE material_id = ?";
    const [result] = await db.query(query, [material_id]);
    // Check if material was found
    if (result.length === 0) {
      return res.status(404).json({ error: "Constrruction material not found" });
    }
    const material = result[0];
    res.json(material);
  } catch (error) {
    console.error("Error fetching material from the database:", error);
    res.status(500).json({ error: "Error fetching material" });
  }
};

// Returns status of creation of new construction material
const createConstructionMaterial = async (req, res) => {
  try {
    const { item } = req.body;
    const query =
      "INSERT INTO construction_materials (item) VALUES (?)";

    const response = await db.query(query, [
      item
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating material:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating material" });
  }
};


const updateConstructionMaterial = async (req, res) => {
  // Get the construction material ID
  const material_id = req.params.id;
  // Get the construction material object
  const newConstructionMaterial = req.body;

  try {
    const [data] = await db.query("SELECT * FROM construction_materials WHERE material_id = ?", [
      material_id,
    ]);

    const oldConstructionMaterial = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newConstructionMaterial, oldConstructionMaterial)) {
      const query =
        "UPDATE construction_materials SET item=? WHERE material_id=?";

      const values = [
        newConstructionMaterial.item,
        material_id
      ];

      // Perform the update
      await db.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "Construction material updated successfully." });
    }

    res.json({ message: "Construction material details are the same, no update" });
  } catch (error) {
    console.log("Error updating construction material", error);
    res
      .status(500)
      .json({ error: `Error updating the construction material with id ${material_id}` });
  }
};

// Endpoint to delete a construction material from the database
const deleteConstructionMaterial = async (req, res) => {
  console.log("Deleting construction material with id:", req.params.id);
  const material_id = req.params.id;

  try {
    // Ensure the construction material exists
    const [isExisting] = await db.query(
      "SELECT 1 FROM construction_materials WHERE material_id = ?",
      [material_id]
    );

    // If the construction material doesnt exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Construction material not found");
    }

    // // Delete related records from the intersection table
    // const [response] = await db.query(
    //   "DELETE FROM bsg_cert_people WHERE pid = ?",
    //   [personID]
    // );

    // console.log(
    //   "Deleted",
    //   response.affectedRows,
    //   "rows from bsg_cert_people intersection table"
    // );

    // Delete the material from construction_materials
    await db.query("DELETE FROM construction_materials WHERE material_id = ?", [material_id]);

    // Return the appropriate status code
    res.status(204).json({ message: "Construction material deleted successfully" })
  } catch (error) {
    console.error("Error deleting construction material from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getConstructionMaterials,
  getConstructionMaterialByID,
  createConstructionMaterial,
  updateConstructionMaterial,
  deleteConstructionMaterial,
};
