import axios from 'axios';

export const getPizzas = async () => await axios.get("http://localhost:3000/api/pizzas")