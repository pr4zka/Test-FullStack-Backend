import { useEffect } from "react";
import { fetchIngredientes } from "../../feactures/ingredientes/ingredientesSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IngredientesForm } from "./IngredientesForm";
import {showNotification} from '../../feactures/toastify/toastifySlice'

const IngredientesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredientes = useSelector((state) => state.ingredientes);
  const ingrediente = ingredientes.result;

  const deleteIngrediente = async (id) => {
    try {
        await axios.delete(
        `http://localhost:3000/api/ingredientes/${id}`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
      dispatch(showNotification("success", "Ingrediente eliminado"))
      dispatch(fetchIngredientes());
    } catch (error) {
       if (error.response.status === 409) dispatch(showNotification("error", "Ingrediente en uso"))
         if (error.response.status === 401)
        dispatch(
          showNotification(
            "error",
            "No estas autorizado para realizar esta acción"
          )
        );
      dispatch(fetchIngredientes());
      console.log(error.response);
    }
  };

  useEffect(() => {
    dispatch(fetchIngredientes());
  }, [dispatch]);
  return (
    <div className="flex justify-center mt-10">
      <div className="bg-zinc-100 rounded-lg shadow-lg shadow-gray-200 p-8 h-screen w-4/5">
        <h1 className="text-2xl font-bold py-2 mb-2 text-center">
          Ingredientes Disponibles
        </h1>
        <div className="flex justify-center">
          <IngredientesForm />
        </div>
        <div className="flex gap- flex-wrap">
          {ingrediente && ingrediente.length > 0 ? (
            ingrediente.map((ingredient, i) => (
              <div key={i} className="px-2">
                <div className="flex bg-indigo-100 w-full rounded-lg shadow-lg shadow-gray-400 mt-6 p-4">
                  <div>
                    <h1 className="py-2">Nombre: {ingredient.nombre}</h1>
                    <h2>{ingredient.categoria}</h2>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    className="mt-2 px-6"
                    onClick={() => deleteIngrediente(ingredient.id)}
                  >
                    <MdDeleteForever className="text-2xl" />
                  </button>
                  <button
                    className="mt-2 px-6"
                    onClick={() =>
                      navigate(`/edit/ingredientes/${ingredient.id}`)
                    }
                  >
                    <FaEdit className="text-2xl" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1>No hay ingredientes</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientesList;
