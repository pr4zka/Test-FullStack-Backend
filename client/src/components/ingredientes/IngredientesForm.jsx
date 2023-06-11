import { Input } from "@nextui-org/react";
import { Formik, Form } from "formik";
import { fetchIngredientes } from "../../feactures/ingredientes/ingredientesSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getIngrediente, updatedIngrediente } from "../../api/ingrediente";
import { showNotification } from "../../feactures/toastify/toastifySlice";
import { verify } from "../../checkType/verify";

export const IngredientesForm = () => {
  const [ing, setIng] = useState({
    nombre: "",
    categoria: "",
  });

  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isEditPage = location.pathname.includes("/edit");

  const handleCreate = async (values) => {
    const token = localStorage.getItem("token");
    const basicToken = localStorage.getItem("basicToken");
    const headers = {
      Accept: "application/json",
      Authorization: verify(basicToken, token)
    }
    try {
      await axios.post(`http://localhost:3000/api/ingredientes`,values, { headers });
      dispatch(fetchIngredientes());
    } catch (error) {
      dispatch(showNotification("error", "Internal server error"));
    }
  };

  const handleUpdate = async (id, values) => {
    try {
      await updatedIngrediente(id, values);
      dispatch(showNotification("success", "Ingrediente actualizado"))
      navigate("/ingredientes");
    } catch (error) {
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
    const loadIng = async () => {
      if (isEditPage) {
        const res = await getIngrediente(params.id);
        setIng({
          nombre: res.data.result.nombre,
          categoria: res.data.result.categoria,
        });
      }
    };
    loadIng();
  }, [params.id]);
  return (
    <div className="">
      <Formik
        initialValues={ing}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          if (params.id) {
            await handleUpdate(params.id, values);
            navigate("/ingredientes");
          } else {
            await handleCreate(values);
          }
          actions.resetForm();
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="">
              <Input
                type="text"
                name="nombre"
                placeholder="Nombre"
                onChange={handleChange}
                value={values.nombre}
                className="mt-1 block w-full border-0 p-1"
              />
              <select
                name="categoria"
                onChange={handleChange}
                value={values.categoria}
              >
                <option value="">Seleccione una categoria</option>
                <option value="Basico">Basico</option>
                <option value="Premium">Premium</option>
              </select>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-500 ml-2 px-2 py-1 text-white rounded-md"
              >
                {isSubmitting ? "Guardando" : "Guardar"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
