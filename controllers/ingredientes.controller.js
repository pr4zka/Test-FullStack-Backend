const { ingredientes } = require('../models/ingredientes');
const pizza = require("../models/pizza");
const { Op } = require("sequelize");

const ingredienteController = {
    getAll: async (req, res) => {
        try {
            const result = await ingredientes.findAll({
                where: {
                    estado: {
                        [Op.eq]: "Activo",
                    },
                },
            });
            res.status(200).json({ msg: "Lista de ingredientes", result });
        } catch (error) {
            res.status(500).json({ msg: "Error server", error });
        }
    },
    getById: async (req, res) => {
        try {
            const ingredienteId = req.params.id;
            const result = await ingredientes.findByPk(ingredienteId);
            if (!ingredientes) return res.status(404).json({ msg: "Ingrediente no Encontrado" });
            res.status(200).json({ msg: "Ingrediente", result });
        } catch (error) {
            res.status(500).json({ msg: "Error server", error });
        }
    },
    createIngrediente: async (req, res) => {
        const { nombre, categoria } = req.body;
        if (!nombre || !categoria)
            return res.status(400).json({ msg: "Debe llenar todos los campos" });
        try {
            const newIngrediente = await ingredientes.create({ nombre, categoria });
            res.status(201).json({ msg: "Ingrediente creado", newIngrediente });
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "Error server", error });
        }
    },
    updateIngrediente: async (req, res) => {
        try {
            const ingredienteId = req.params.id;
            const result = await ingredientes.findByPk(ingredienteId);
            if (!result) return res.status(404).json({ msg: "Ingrediente no encontrado" });
            const ingredienteUpdated = await ingredientes.update(req.body, {
                where: { id: ingredienteId },
            });
            res.status(200).json({ msg: "Ingrediente actualizado", ingredienteUpdated });
        } catch (error) {
            res.status(500).json({ msg: "Error server", error });
        }
    },
    deleteIngrediente: async (req, res) => {
    try {
        const ingredienteId = req.params.id;
        const ingrediente = await ingredientes.findByPk(ingredienteId);
        if (!ingrediente) {
            return res.status(404).json({ error: "Ingrediente no encontrado" });
        }
        const pizzasConIngrediente = await pizza.findAndCountAll({
            include: [{ model: ingredientes, where: { id: ingredienteId } }],
        });
        if (pizzasConIngrediente.count > 0) {
            return res.status(409).json({ error: "No se puede borrar el ingrediente" });
        }
        await ingredientes.destroy({ where: { id: ingredienteId } });
        res.status(200).json({ msg: "Ingrediente borrado" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error interno del servidor" });
    }
}
}

module.exports = ingredienteController;