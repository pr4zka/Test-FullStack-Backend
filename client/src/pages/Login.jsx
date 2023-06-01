import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, loginBasic, setAuthData, setAuhtBasic } from "../feactures/auth/authSlice";
import {showNotification} from '../feactures/toastify/toastifySlice'

export const Login = () => {
  const [auth, setAuth] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
console.log(auth)
  const dispatch = useDispatch();

  const handleAuth = (e) => {
    setAuth(e.target.value);
  };
  const handleUsuarioChange = (e) => {
    setNombre(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  if (!auth) {
    dispatch(
      showNotification("error", "Seleccione el tipo de autenticación")
    );
    return;
  } else if (!nombre || !password) {
    dispatch(showNotification("error", "Ingrese usuario y contraseña"));
    return;
  } else {
    try {
      if (auth === 'jwt') {
       const res = await dispatch(login({ nombre, password }));
       if(res.error && res.error.code === 'ERR_BAD_REQUEST')dispatch(showNotification('error', 'Usuario o contraseña incorrectos'));
       dispatch(setAuthData(res.payload))
      } else if (auth === 'basic') {
        const res = await dispatch(loginBasic({ nombre, password }));
        if(res.error && res.error.code === 'ERR_BAD_REQUEST')dispatch(showNotification('error', 'Usuario o contraseña incorrectos'))
        dispatch(setAuhtBasic(res.payload));
      }
       dispatch(showNotification('success', 'Usuario autenticado correctamente'))
    } catch (error) {
      console.log(error)
    }
  }
};


  return (
    <section className="flex justify-center py-14">
      <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Ingrese sus credenciales
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ingresa tu usuario
              </label>
              <input
                type="text"
                name="nombre"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Escribe tu usuario"
                onChange={handleUsuarioChange}
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ingresa tu contraseña
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handlePasswordChange}
                required=""
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="basic-auth"
                    value="basic"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    onChange={handleAuth}
                    checked={auth === "basic"}
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="basic-auth"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Basic Auth
                  </label>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    value="jwt"
                    name="auth"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    onChange={handleAuth}
                    checked={auth === "jwt"}
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="jwt-auth"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Auth JWT
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-700 text-white text-sm font-medium px-2 py-1 hover:bg-indigo-600 focus:outline-none rounded"
              onClick={(e) => {
                handleLogin(e);
              }}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
