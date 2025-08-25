import React from "react";
import { useNavigate } from "react-router-dom";
import "./inscription.css";

function InscriptionChoix() {
    const navigate = useNavigate();

    return (
        <div className="register-choice">
            <div className="overlay">
                <div className="choice-card">
                    <h2>Créer un compte</h2>
                    <p>Choisissez votre type de compte pour continuer :</p>

                    <div className="buttons">
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/register/candidate")}
                        >
                            👤 Je suis un Candidat
                        </button>

                        <button
                            className="btn btn-success"
                            onClick={() => navigate("/register/employer")}
                        >
                            🏢 Je suis un Employeur
                        </button>
                    </div>
                    {/* 🔙 Bouton retour */}
                    <button
                        className="btn btn-outline-secondary w-100 mt-3"
                        onClick={() => navigate("/")}
                    >
                        ⬅ Retour
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InscriptionChoix;
