import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import {
  fetchPizzaDetalle,
  selectPizzaDetalle,
} from "../feactures/pizzas/pizzasSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IngredientesAdd } from "../components/ingredientes/IngredientesAdd";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

export const PizzasDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pizzaDetalle = useSelector(selectPizzaDetalle);

  useEffect(() => {
    dispatch(fetchPizzaDetalle(id));
  }, [dispatch, id]);

  if (!pizzaDetalle) {
    return <p>Cargando...</p>;
  }
  const handleDeleteIngre = async (pizzaId, ingredienteId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/pizzas/${pizzaId}/remove-ingrediente/${ingredienteId}`
      );
      console.log("response", response);
      dispatch(fetchPizzaDetalle(pizzaId));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="bg-zinc-200 rounded-lg shadow-lg shadow-gray-400 p-8 h-4/6 w-4/12 m-auto py-10 px-10 mt-24">
        <h1>{pizzaDetalle.nombre}</h1>
        <p>Precio: {pizzaDetalle.precio}</p>
        <p>Estado: {pizzaDetalle.estado}</p>
        <div className="flex justify-end">
          <button
            className="text-lg rounded-lg px-2 mt-3 hover:text-green-300"
            onClick={() => navigate(`/pizzas/edit/${pizzaDetalle.id}`)}
          >
            <FaEdit className="text-2xl" />
          </button>
        </div>
        {pizzaDetalle.ingredientes.length > 0 ? (
          <div>
            <h2 className="text-indigo-700 my-2">Ingredientes:</h2>
            <ul>
              {pizzaDetalle.ingredientes.map((ingrediente) => (
                <li key={ingrediente.id}>
                  {ingrediente.nombre}
                  <button onClick={() => handleDeleteIngre(id, ingrediente.id)}>
                    <AiOutlineDelete className="mx-6" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No hay ingredientes disponibles</p>
        )}
      </div>
      <IngredientesAdd />
    </div>
  );
};
