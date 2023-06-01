import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../feactures/auth/authSlice'
import toastReducer from '../feactures/toastify/toastifySlice'
import pizzaReducer from '../feactures/pizzas/pizzasSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        toast: toastReducer,
        pizzas: pizzaReducer
    }
})

