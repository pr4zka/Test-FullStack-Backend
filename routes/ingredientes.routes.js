const { Router } = require("express");
const ingredienteController = require("../controllers/ingredientes.controller");
const { checkType } = require("../middlewares/tokenHandle");
const router = Router();

router.get("/", ingredienteController.getAll);
router.get("/:id", ingredienteController.getById);
router.post("/", checkType, ingredienteController.createIngrediente);
router.patch("/:id", checkType, ingredienteController.updateIngrediente);
router.delete("/:id", checkType, ingredienteController.deleteIngrediente);

module.exports = router;
