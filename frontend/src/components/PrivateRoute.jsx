import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    // Se não estiver autenticado, redireciona para a página de Welcome
    return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;