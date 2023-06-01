import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import Pizzas from './pages/Pizzas'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Pizzas />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
