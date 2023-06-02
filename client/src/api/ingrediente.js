import axios from "axios";

export const getIngredientes = async () =>
  await axios.get("http://localhost:3000/api/ingredientes", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
export const getIngrediente = async (id) =>
  await axios.get(`http://localhost:3000/api/ingredientes/${id}`);
export const updatedIngrediente = async (id, values) =>
  axios.patch(`http://localhost:3000/api/ingredientes/${id}`, values, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
export const deleteIngrediente = async (id) =>
  await axios.delete(`http://localhost:3000/api/ingredientes/${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
