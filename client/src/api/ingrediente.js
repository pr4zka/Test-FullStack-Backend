import axios from 'axios';

export const getIngredientes = async () => await axios.get("http://localhost:3000/api/ingredientes")
export const getIngrediente = async (id) => await axios.get(`http://localhost:3000/api/ingredientes/${id}`)
export const updatedIngrediente = async (id, values) => axios.patch(`http://localhost:3000/api/ingredientes/${id}`, values)
export const deleteIngrediente = async (id) => await axios.delete(`http://localhost:3000/api/ingredientes/${id}`)