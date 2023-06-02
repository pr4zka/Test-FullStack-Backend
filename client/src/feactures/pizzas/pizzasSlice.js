import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPizzas, getPizzaDetalle, addIngrediente } from "../../api/pizza";
import { createSelector } from "reselect";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzas",
  async () => {
    const response = await getPizzas();
    return response.data.pizzas;
  }
);

export const fetchPizzaDetalle = createAsyncThunk(
  "pizzas/fetchPizzaDetalle",
  async (id) => {
    const response = await getPizzaDetalle(id);
    console.log(response.data);
    return response.data;
  }
);

export const createPizza = createAsyncThunk(
  "pizzas/createPizza",
  async (pizzaData) => {
    const response = await createPizza(pizzaData);
    return response.data;
  }
);

export const addIngredientes = createAsyncThunk(
  "pizzas/addIngrediente",
  async (pizzaId, ingredienteId) => {
    const response = await addIngrediente(pizzaId, ingredienteId);
    console.log(response);
    return response.data;
  }
);

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState: {},
  reducers: {},
  extraReducers: (builded) => {
    builded.addCase(fetchPizzas.fulfilled, (state, action) => {
      return action.payload;
    });
    builded.addCase(createPizza.fulfilled, (state, action) => {
      console.log(action.payload);
    });
    builded.addCase(fetchPizzaDetalle.fulfilled, (state, action) => {
      return { ...state, pizzaDetalle: action.payload };
    });
  },
  immer: false, // Desactivar Immer
});

export default pizzasSlice.reducer;

export const selectPizzaDetalle = createSelector(
  (state) => state.pizzas,
  (pizzas) => pizzas.pizzaDetalle
);
