import axios from "axios";
import { Formik, Form, Field } from "formik";
import {showNotification} from '../feactures/toastify/toastifySlice'
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'

export const Register = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    try {
      await axios.post("http://localhost:3000/api/auth/register", values);
      dispatch(showNotification('success', 'Usuario Registrado'))
      navigate('/login')
    } catch (error) {
      dispatch(showNotification('error', 'Error al registrar usuario'))
    }
  };

  return (
    <div>
      <h1>Register</h1>
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
            className="bg-gray-200 mx-2"
          />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="bg-gray-200 mx-2"
          />
          <Field as="select" name="tipo">
            <option value="">Selecionar Tipo</option>
            <option value="STAFF">Staff</option>
            <option value="NORMAL">Normal</option>
          </Field>
          <button className="bg-green-400 mx-5 rounded-lg px-2" type="submit">
            Registrar
          </button>
        </Form>
      </Formik>
    </div>
  );
};
