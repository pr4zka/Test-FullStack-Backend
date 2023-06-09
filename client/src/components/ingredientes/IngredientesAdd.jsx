import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredientes } from "../../feactures/ingredientes/ingredientesSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { fetchPizzaDetalle } from "../../feactures/pizzas/pizzasSlice";
import { showNotification } from "../../feactures/toastify/toastifySlice";
import {verify} from '../../checkType/verify'

export const IngredientesAdd = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ingrediente = useSelector((state) => state.ingredientes);
  const [selectedIngrediente, setSelectedIngrediente] = useState("");
  const isAuth = localStorage.getItem("isAuth");
  const handleIngredienteChange = (event) => {
    setSelectedIngrediente(event.target.value);
  };
  const handleAgregarClick = async () => {
    try {
       await axios.post(
        `http://localhost:3000/api/pizzas/${id}/ingredientes/${selectedIngrediente}`
      );
      dispatch(fetchPizzaDetalle(id));
    } catch (error) {
      dispatch(showNotification("error", "Internal server error"))
    }
  };

  useEffect(() => {
    dispatch(fetchIngredientes());
  }, [dispatch]);

  return (
    <div className="flex justify-center ">
      <div className="flex items-center my-10 px-4">
        <h1 className="text-indigo-600 px-2">Ingrediente</h1>
        <form>
          <select
            value={selectedIngrediente}
            onChange={handleIngredienteChange}
          >
            <option value="">Seleccionar ingrediente</option>
            {ingrediente &&
            ingrediente.result &&
            ingrediente.result.length > 0 ? (
              ingrediente.result.map((ingre, i) => (
                <option key={i} value={ingre.id}>
                  {ingre.nombre}
                </option>
              ))
            ) : (
              <option disabled>No hay ingredientes disponibles</option>
            )}
          </select>
        </form>
        <button
          onClick={handleAgregarClick}
          className="px-4 mx-2 bg-indigo-500 rounded hover:bg-indigo-600 text-white"
          disabled={!selectedIngrediente || isAuth === "false"}
        >
          Agregar
        </button>
      </div>
      <div className="my-9 mx-6 ml-24"></div>
    </div>
  );
};
