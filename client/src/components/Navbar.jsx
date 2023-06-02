import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoading(true);
    navigate("/login");
    setTimeout(() => {
      localStorage.setItem("isAuth", "false");
      setIsAuth(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("isAuth", "true");
      setIsAuth(true);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const authValue = localStorage.getItem("isAuth") === "true";
    setIsAuth(authValue);
  }, []);

  return (
    <nav className="bg-gray-100 px-10 py-5 flex justify-between">
      <Link to="/">
        <h1 className="text-lg">Frontend Pizzas</h1>
      </Link>
      <ul className="flex gap-x-4">
        <li>
          <Link
            to="/"
            className="bg-indigo-700 text-white text-sm font-medium px-2 py-1 hover:bg-indigo-600 focus:outline-none rounded"
          >
            Home
          </Link>
        </li>
        {isLoading && <li>Cerrando Sesión...</li>}

        {isAuth ? (
          <li>
            <button
              onClick={handleLogout}
              className="bg-indigo-700 text-white text-sm font-medium px-2 py-1 hover:bg-indigo-600 focus:outline-none rounded"
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <button
              onClick={handleLogin}
              className="bg-indigo-700 text-white text-sm font-medium px-2 py-1 hover:bg-indigo-600 focus:outline-none rounded"
            >
              Login
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
