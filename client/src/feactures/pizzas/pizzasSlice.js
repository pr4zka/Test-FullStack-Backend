import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getPizzas} from '../../api/pizza'


export const fetchPizzas = createAsyncThunk("pizzas/fetchPizzas", 
async (ciuades, thunkAPI) => {
   const response = await getPizzas()
   console.log(response.data.pizzas)
    return response.data.pizzas
    
})

export const createPizza = createAsyncThunk("pizzas/createPizza", async(pizzaData, thunkAPI) => {
    const response = await createPizza(pizzaData)
    return response.data
})

const pizzasSlice = createSlice({
    name: "pizzas",
    initialState: {},
    reducers: {},
    extraReducers: (builded) => {
        builded.addCase(fetchPizzas.fulfilled, (state, action) => {
            console.log("payload",action.payload)
            return action.payload
        })
        builded.addCase(createPizza.fulfilled, (state, action) => {
             console.log(action.payload)
        })
    }
})

export default pizzasSlice.reducer