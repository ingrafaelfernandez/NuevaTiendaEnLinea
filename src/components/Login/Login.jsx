import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext/AuthContext.jsx";
import "./Login.css";

export const Login = () => {   
    const { user, login } = useAuthContext();
    const [userForm, setUserForm] = useState({ name: "", password: "" });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Usar useEffect para manejar la redirección
    useEffect(() => {
        if (user) {
            navigate("/admin/product-form", { replace: true });
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (!userForm.name.trim()) {
            setErrors({ name: "El usuario es requerido" });
            return;
        }

        if (!userForm.password.trim()) {
            setErrors({ password: "La contraseña es requerida" });
            return;
        }

        const loginSuccess = login(userForm.name, userForm.password);
        if (loginSuccess) {
            navigate("/admin/product-form", { replace: true });
        } else {
            setErrors({ general: "Usuario o contraseña incorrectos" });
        }
    };

    return (
        <div className="login-container">
            {errors.general && (
                <div className="error-message">
                    {errors.general}
                </div>
            )}
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Iniciar Sesión</h2>
                
                <div className="input-group">
                    <label htmlFor="name">Usuario:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userForm.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="input-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userForm.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <button type="submit" className="btn">Ingresar</button>
            </form>
        </div>
    );
};