import axios from "axios";
import { Formik, Form, Field } from "formik";
import { showNotification } from "../feactures/toastify/toastifySlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await axios.post("http://localhost:3000/api/auth/register", values);
      dispatch(showNotification("success", "Usuario Registrado"));
      navigate("/login");
    } catch (error) {
      dispatch(showNotification("error", "Error al registrar usuario"));
    }
  };

  return (
    <div>
      <h1 className="font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center mt-10">
        Registrate
      </h1>
      <div className="flex justify-center m-auto w-72 mt-2">
        <div className="flex">
          <Formik
            initialValues={{ nombre: "", password: "", tipo: "" }}
            onSubmit={async (values, action) => {
              await handleSubmit(values);
              action.resetForm();
            }}
          >
            <Form>
              <Field
                type="text"
                name="nombre"
                placeholder="Usuario"
                className="bg-gray-200 mx-2 m-4 rounded-sm"
              />
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="bg-gray-200 mx-2 m-4 rounded-sm"
              />
              <Field as="select" name="tipo" className="px-4 m-3 rounded-sm">
                <option value="">Selecionar Tipo</option>
                <option value="STAFF">Staff</option>
                <option value="NORMAL">Normal</option>
              </Field>
              <button
                className="bg-green-400 rounded-lg  m-2 block w-full"
                type="submit"
              >
                Registrar
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};
