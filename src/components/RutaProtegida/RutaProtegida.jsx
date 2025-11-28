import { Children } from "react";
import { useAuthContext } from "../../Context/AuthContext/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export const RutaProtegida = ({ children }) => {
  const { user } = useAuthContext();        
    if (!user) {        
        return <Navigate to="/" replace />; 
    }
    return children; 
}   