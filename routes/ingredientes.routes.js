const { Router } = require("express");
const ingredienteController = require("../controllers/ingredientes.controller");
const router = Router();

router.get("/", ingredienteController.getAll);
router.get("/:id", ingredienteController.getById);
router.post("/", ingredienteController.createIngrediente);
router.put("/:id", ingredienteController.updateIngrediente);
router.delete("/:id", ingredienteController.deleteIngrediente);

module.exports = router;
