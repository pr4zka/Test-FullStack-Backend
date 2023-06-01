import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-gray-100 px-10 py-5 flex justify-between">
      <h1 className="text-lg">Frontend Pizzas</h1>
      <ul className="flex gap-x-4">
        <li>
          <Link to="/login" className="bg-indigo-700 text-white text-sm font-medium px-2 py-1 hover:bg-indigo-600 focus:outline-none rounded">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};
