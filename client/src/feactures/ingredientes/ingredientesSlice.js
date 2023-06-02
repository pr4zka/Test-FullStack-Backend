import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIngredientes } from "../../api/ingrediente";
import { deleteIngrediente } from "../../api/ingrediente";

export const fetchIngredientes = createAsyncThunk(
  "ingredientes/fetchIngredientes",
  async () => {
    const response = await getIngredientes();
    console.log(response);
    return response.data;
  }
);

export const deleteIngredient = createAsyncThunk(
  "ingredientes/deleteIngrediente",
  async (id) => {
    const res = await deleteIngrediente(id);
    return res.data;
  }
);

const ingredientesSlice = createSlice({
  name: "ingredientes",
  initialState: [],
  reducers: {},
  extraReducers: (builded) => {
    builded.addCase(fetchIngredientes.fulfilled, (state, action) => {
      return action.payload;
    });
    builded.addCase(deleteIngredient.fulfilled, (state, action) => {
      console.log(action.payload);
      const id = action.meta.arg; // Obtener el ID del ingrediente eliminado
      return state.filter((ingrediente) => ingrediente.id !== id); // Filtrar los ingredientes excluyendo el que fue eliminado
    });
  },
});

export default ingredientesSlice.reducer;
