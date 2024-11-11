import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Auth from "../../services/auth";
import "./AdminDashboard.css";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (Auth.isTokenExpired(token)) {
      setIsAuthenticated(false); 
      Auth.checkAndRemoveExpiredToken(); 
    }
  }, []);

  const handleLogout = () => {
    Auth.logout(); 
    setIsAuthenticated(false); 
  };

  return (
    <div className="dashboard-container">
    <div className="sidebar">
      <ul className="buttons-list">
        <li>
          <Link className="button" to="/view-events">Ver eventos</Link> 
        </li>
        {isAuthenticated ? (
          <>
            <li><Link className="button" to="/create-event">Crear evento</Link></li>
            <li><button className="button logout" onClick={handleLogout}>Cerrar Sesión</button></li>
          </>
        ) : (
          <li><Link className="button" to="/login">Iniciar sesión</Link></li>
        )}
      </ul>
    </div>
    <div className="main-content">
      <h1>Inicio</h1>

    </div>
  </div>

  );
};

export default Dashboard;

