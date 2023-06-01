import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredientes } from "../../feactures/ingredientes/ingredientesSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { fetchPizzaDetalle } from "../../feactures/pizzas/pizzasSlice";
import { IngredientesForm } from "../ingredientes/IngredientesForm";

export const IngredientesAdd = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ingredientes = useSelector((state) => state.ingredientes);
  const ingrediente = ingredientes.result;
  const [selectedIngrediente, setSelectedIngrediente] = useState("");

  const handleIngredienteChange = (event) => {
    setSelectedIngrediente(event.target.value);
  };

  const handleAgregarClick = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/pizzas/${id}/ingredientes/${selectedIngrediente}`
      );
      console.log("response", response.data);
      dispatch(fetchPizzaDetalle(id));
    } catch (error) {
      console.log("error", error);
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
            {ingrediente && ingrediente.length > 0 ? (
              ingrediente.map((ingre, i) => (
                <option key={i} value={ingre.id}>
                  {ingre.nombre}
                </option>
              ))
            ) : (
              <option>No hay ingredientes disponibles</option>
            )}
          </select>
        </form>
        <button onClick={handleAgregarClick} className="px-4 mx-2 bg-indigo-300 rounded hover:bg-indigo-600">
          Agregar
        </button>
      </div>
      <div className="my-9 mx-6 ml-24">
        <IngredientesForm />
      </div>
    </div>
  );
};
