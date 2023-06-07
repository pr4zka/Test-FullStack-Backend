import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("basicToken");
    navigate("/login");
  };

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
        <li>
          {localStorage.getItem("token") ? (
            <button
              onClick={handleLogout}
              className="bg-indigo-700 text-white text-sm font-medium px-2 py-1 hover:bg-indigo-600 focus:outline-none rounded"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-700 text-white text-sm font-medium px-2 py-1 hover:bg-indigo-600 focus:outline-none rounded"
            >
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};