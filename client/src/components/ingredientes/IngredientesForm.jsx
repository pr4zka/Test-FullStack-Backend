import { Input } from "@nextui-org/react";
import { Formik, Form } from "formik";
import { fetchIngredientes } from "../../feactures/ingredientes/ingredientesSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

export const IngredientesForm = () => {
  const dispatch = useDispatch();
  const handleCreate = async (values) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/ingredientes`,
        values
      );
      console.log("response", response.data);
      dispatch(fetchIngredientes());
    } catch (error) {
      console.log("error", error);
    }
  };

  

  return (
    <div className="">
      <Formik
        initialValues={{
          nombre: "",
          categoria: "",
        }}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          handleCreate(values);
          actions.resetForm();
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
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
              <select name="categoria" onChange={handleChange} value={values.categoria}>
                <option value="">Seleccione una categoria</option>
                <option value="Basico">Basico</option>
                <option value="Premium">Premium</option>
              </select>
              <button className="bg-indigo-300 mx-2 px-4 rounded-sm hover:bg-indigo-600">
                Crear
              </button>
              <button className="bg-indigo-300 mx-2 px-4 rounded-sm hover:bg-indigo-600">
                Editar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
