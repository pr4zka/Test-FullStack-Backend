import axios from 'axios';

export const getPizzas = async () => await axios.get("http://localhost:3000/api/pizzas")
export const getPizzaDetalle = async (id) => await axios.get(`http://localhost:3000/api/pizzas/${id}/detalle`)
export const addIngrediente = async (pizzaId, ingredienteId) => await axios.post(`http://localhost:3000/api/pizzas/${pizzaId}/ingredientes/${ingredienteId}`)