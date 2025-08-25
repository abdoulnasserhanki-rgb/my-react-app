import React from "react";
import "./accueil.css";
import { useNavigate } from "react-router-dom";

function Accueil() {
  const navigate = useNavigate();
  return (
      <div className="home-page">
        <div className="home-overlay">
          <div className="home-content">
            <h1>Bienvenue sur <span className="brand">MonEmploi+</span></h1>
            <p>
              La plateforme moderne de recrutement en ligne.<br />
              Trouvez le job qui vous correspond ou publiez vos offres d'emploi.
            </p>

            <div className="home-buttons">
              <button className="btn btn-primary me-3" onClick={() => navigate("/login")}>
                🔑 Se Connecter
              </button>
              <button className="btn btn-success" onClick={() => navigate("/register")}>
                📝 S'Inscrire
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Accueil;
