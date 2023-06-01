import axios from 'axios';

export const getIngredientes = async () => await axios.get("http://localhost:3000/api/ingredientes")