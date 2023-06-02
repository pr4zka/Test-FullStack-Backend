import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const staffOnly = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.tipo !== "staff") {
    return false;
  }
  return true;
};

export const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!staffOnly()) {
      navigate("/login"); // Redirigir al usuario a la página de inicio de sesión si no tiene acceso
    }
  }, []);

  return <>{staffOnly() && children}</>;
};