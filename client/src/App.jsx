import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import Pizzas from "./pages/Pizzas";
import { PizzasDetail } from "./pages/PizzasDetail";
import PizzasForm from "./pages/PizzasForm";
import IngredientesList from "./components/ingredientes/IngredientesList";
import { IngredientesForm } from "./components/ingredientes/IngredientesForm";
import { Register } from "./pages/Register";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Pizzas />} />
        <Route path="/pizzas/:id" element={<PizzasDetail />} />
        <Route path="/pizzas/new" element={<PizzasForm />} />
        <Route path="/pizzas/edit/:id" element={<PizzasForm />} />
        <Route path="/ingredientes" element={<IngredientesList />} />
        <Route path="/edit/ingredientes/:id" element={<IngredientesForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
