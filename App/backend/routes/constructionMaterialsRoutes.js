const express = require("express");
const router = express.Router();
const {
  getConstructionMaterials,
  getConstructionMaterialByID,
  createConstructionMaterial,
  updateConstructionMaterial,
  deleteConstructionMaterial,
} = require("../controllers/constructionMaterialsController");

router.get("/", getConstructionMaterials);
router.get("/:id", getConstructionMaterialByID);
router.post("/", createConstructionMaterial);
router.put("/:id", updateConstructionMaterial);
router.delete("/:id", deleteConstructionMaterial);

module.exports = router;
