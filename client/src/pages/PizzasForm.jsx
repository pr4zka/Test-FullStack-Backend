import { Input } from "@nextui-org/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { showNotification } from "../feactures/toastify/toastifySlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updatedPizza, getPizza } from "../api/pizza";

const PizzasForm = () => {
  const [pizza, setPizza] = useState({
    nombre: "",
    precio: "",
    estado: "",
  });

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const handleCreatePizza = async (values) => {
    try {
      await axios.post(`http://localhost:3000/api/pizzas`, values, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Authorization-Basic": `Basic ${localStorage.getItem("basicToken")}`,
        },
      });
      dispatch(showNotification("success", "Pizza creada correctamente"));
      navigate("/");
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 401)
        dispatch(
          showNotification(
            "error",
            "No estas autorizado para realizar esta acción"
          )
        );
    }
  };

  const handleUpdatePizza = async (id, values) => {
    try {
      const res = await updatedPizza(id, values);
      dispatch(showNotification("success", "Pizza actualizada correctamente"));
      navigate("/");
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 401)
        dispatch(
          showNotification(
            "error",
            "No estas autorizado para realizar esta acción"
          )
        );
    }
  };

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const res = await getPizza(params.id);
        console.log(res.data.pizzas);
        setPizza({
          nombre: res.data.pizzas.nombre,
          precio: res.data.pizzas.precio,
          estado: res.data.pizzas.estado,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPizza();
  }, [params.id]);
  return (
    <>
      <div className="flex justify-center">
        <div className="bg-gray-200 rounded-lg shadow-lg shadow-gray-300 p-8 h-4/6 w-4/12 m-auto py-10 px-10 mt-24">
          <Formik
            initialValues={pizza}
            enableReinitialize={true}
            onSubmit={async (values, action) => {
              if (params.id) {
                await handleUpdatePizza(params.id, values);
              } else {
                await handleCreatePizza(values);
              }
              action.resetForm();
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <Input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    onChange={handleChange}
                    value={values.nombre}
                    className="mt-1 block w-full border-0 p-1"
                  />
                  <Input
                    type="text"
                    name="precio"
                    placeholder="Precio"
                    onChange={handleChange}
                    value={values.precio}
                    className="mt-1 block w-full border-0 p-1"
                  />
                  <select
                    name="estado"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.estado}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled className="text-black">
                      Seleccione el estado
                    </option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="block bg-indigo-500 px-2 py-1 mt-5 hover:bg-indigo-400 text-white w-full rounded-md"
                >
                  {isSubmitting ? "Creando..." : "Crear"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default PizzasForm;
