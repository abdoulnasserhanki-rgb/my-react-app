import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 👈 Import navigation
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // 👈 Hook pour naviguer

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });
      setMessage("Connexion réussie !");
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      setMessage("Échec de la connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="text-center mb-4">🔑 Connexion</h2>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="exemple@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Se connecter
          </button>
        </form>
        <p className="mt-3 text-center">
          Pas encore de compte ? <a href="/register">Inscrivez-vous</a>
        </p>

        {/* 🔙 Bouton retour */}
        <button
          className="btn btn-outline-secondary w-100 mt-3"
          onClick={() => navigate("/")}
        >
          ⬅ Retour
        </button>
      </div>
    </div>
  );
}

export default Login;
