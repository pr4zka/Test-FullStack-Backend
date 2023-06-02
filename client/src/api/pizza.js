import axios from 'axios';

export const getPizzas = async () => await axios.get("http://localhost:3000/api/pizzas")
export const getPizzaDetalle = async (id) => await axios.get(`http://localhost:3000/api/pizzas/${id}/detalle`)
export const getPizza = async (id) => await axios.get(`http://localhost:3000/api/pizzas/${id}`)
export const addIngrediente = async (pizzaId, ingredienteId) => await axios.post(`http://localhost:3000/api/pizzas/${pizzaId}/ingredientes/${ingredienteId}`)
export const updatedPizza = async (id, pizza) => await axios.patch(`http://localhost:3000/api/pizzas/${id}`, pizza, {
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})