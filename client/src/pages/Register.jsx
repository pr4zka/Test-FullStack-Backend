import axios from "axios";
import { Formik, Form, Field } from "formik";

export const Register = () => {
  const handleSubmit = async (values) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", values);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <Formik
        initialValues={{ nombre: "", password: "", tipo: "" }}
        onSubmit={async (values) => {
          await handleSubmit(values);
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
