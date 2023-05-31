const pizza = require("../models/pizza");
const { ingredientes } = require("../models/ingredientes");

const pizzaController = {
  getAll: async (req, res) => {
    try {
      const pizzas = await pizza.findAll({ as: "pizza_ingredientes" });
      res.status(200).json({ msg: "Lista de pizzas", pizzas });
    } catch (error) {
      res.status(500).json({ msg: "Error server", error });
    }
  },
  getById: async (req, res) => {
    try {
      const pizzaId = req.params.id;
      const pizzas = await pizza.findByPk(pizzaId);
      if (!pizzas) return res.status(404).json({ msg: "Pizza no encontrada" });
      res.status(200).json({ msg: "Pizza", pizzas });
    } catch (error) {
      res.status(500).json({ msg: "Error server", error });
    }
  },
  createPizza: async (req, res) => {
    const { nombre, precio, estado } = req.body;
    if (!nombre || !precio || !estado)
      return res.status(400).json({ msg: "Debe llenar todos los campos" });
    try {
      const newPizza = await pizza.create({ nombre, precio, estado });
      res.status(201).json({ msg: "Pizza creada", newPizza });
    } catch (error) {
      res.status(500).json({ msg: "Error server", error });
    }
  },
  updatePizza: async (req, res) => {
    try {
      const pizzaId = req.params.id;
      const result = await pizza.findByPk(pizzaId);
      if (!result) return res.status(404).json({ msg: "Pizza no encontrada" });
      const pizzaUpdated = await pizza.update(req.body, {
        where: { id: pizzaId },
      });
      res.status(200).json({ msg: "Pizza actualizada", pizzaUpdated });
    } catch (error) {
      res.status(500).json({ msg: "Error server", error });
    }
  },
  deletePizza: async (req, res) => {
    try {
      const pizzaId = req.params.id;
      const result = await pizza.findByPk(pizzaId);
      if (!result) return res.status(404).json({ msg: "Pizza no encontrada" });
      await pizza.destroy({ where: { id: pizzaId } });
      res.status(200).json({ msg: "Pizza borrada" });
    } catch (error) {
      res.status(500).json({ msg: "Error server", error });
    }
  },
  addIngredientes: async (req, res) => {
    const { pizzaId, ingredienteId } = req.params;

    try {
      const resultPizza = await pizza.findByPk(pizzaId);
      const ingrediente = await ingredientes.findByPk(ingredienteId);

      if (!resultPizza || !ingrediente) {
        return res
          .status(404)
          .json({ msg: "Pizza o ingrediente no encontrado" });
      }

      await resultPizza.addIngrediente(ingrediente); // Agrega el ingrediente a la pizza

      const ingredientesPizza = await resultPizza.getIngredientes();

      res
        .status(200)
        .json({ msg: "Ingrediente agregado a la pizza", ingredientesPizza });
    } catch (error) {
      res.status(500).json({ msg: "Error server", error });
    }
  },
  getDetalles: async (req, res) => {
    try {
      const pizzaId = req.params.id;
      const result = await pizza.findByPk(pizzaId);
      if (!result) return res.status(404).json({ msg: "Pizza no encontrada" });
      const detail = await result.getIngredientes({
        raw: true,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      const pizzaDetalle = detail.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        categoria: item.categoria,

      }));

      res.status(200).json({
        msg: "Pizza",
        result: result.get({
          plain: true,
          attributes: ["nombre", "precio", "estado"],
        }),
        detail: pizzaDetalle,
      });
    } catch (error) {
      res.status(500).json({ msg: "Error server", error });
    }
  },
  removeIngredientes: async (req, res) => {
    const { pizzaId, ingredienteId } = req.params;

    try {
      const pizzaInstance = await pizza.findByPk(pizzaId);
      const ingredienteInstance = await ingredientes.findByPk(ingredienteId);

      if (!pizzaInstance || !ingredienteInstance) {
        return res
          .status(404)
          .json({ msg: "Pizza o ingrediente no encontrado" });
      }

      await pizzaInstance.removeIngrediente(ingredienteInstance);
      res.status(200).json({ msg: "Ingrediente eliminado de la pizza" });
    } catch (error) {
      res.status(500).json({ msg: "Error server", error });
    }
  },
};
module.exports = pizzaController;
