const { Router } = require("express");
const pizzaController = require("../controllers/pizza.controller");
const router = Router();

router.get('/', pizzaController.getAll)
router.get("/:id", pizzaController.getById);
router.get("/:id/detalle", pizzaController.getDetalles)
router.post("/", pizzaController.createPizza);
router.post("/:pizzaId/ingredientes/:ingredienteId", pizzaController.addIngredientes);
router.post("/:pizzaId/remove-ingrediente/:ingredienteId", pizzaController.removeIngredientes)
router.patch("/:id", pizzaController.updatePizza);
router.delete("/:id", pizzaController.deletePizza);

module.exports = router;
