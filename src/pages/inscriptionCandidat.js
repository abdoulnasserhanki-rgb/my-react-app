import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { getNames } from "country-list";
import Select from "react-select";
import "react-phone-input-2/lib/style.css";
import { registerUser } from "../services/api";

function InscriptionCandidat({type}) {
  const [formData, setFormData] = useState({
    civilite: "",
    prenom: "",
    nom: "",
    pays: "",
    telephone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  type="candidats"

  const [countries, setCountries] = useState([]);
  const [defaultCountry, setDefaultCountry] = useState(); // Niger par défaut

  // Charger la liste des pays
  useEffect(() => {
    const countryOptions = getNames().map((country) => ({
      value: country,
      label: country,
    }));
    setCountries(countryOptions);

    // Détection du pays de l'utilisateur via navigateur
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.country_name) {
          setFormData((prev) => ({ ...prev, pays: data.country_name }));
        }
        if (data.country_code) {
          setDefaultCountry(data.country_code.toLowerCase());
        }
      });
  }, []);

  // Gestion des changements
  const handleChange = (nameOrEvent, value) => {
  if (typeof nameOrEvent === "string") {
    // Cas où tu passes ("civilite", "Mr") par exemple
    setFormData({ ...formData, [nameOrEvent]: value });
  } else {
    // Cas classique où c’est un event
    const { name, value } = nameOrEvent.target;
    setFormData({ ...formData, [name]: value });
  }
};

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        alert("Les mots de passe ne correspondent pas !");
        return;
      }
      const response = await registerUser(formData, type);
      alert("Inscription réussie ✅");
      console.log(response.data);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l’inscription ❌");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Inscription Candidat</h2>
            <form onSubmit={handleSubmit}>
              {/* Civilité */}
              <div className="mb-3">
                <label className="form-label">Civilité</label>
                <select
                  className="form-select"
                  name="civilite"
                  value={formData.civilite}
                  onChange={(e) => handleChange("civilite", e.target.value)}
                  required
                >
                  <option value="">-- Sélectionnez --</option>
                  <option value="Mr">Monsieur</option>
                  <option value="Mme">Madame</option>
                </select>
              </div>

              {/* Prénom */}
              <div className="mb-3">
                <label className="form-label">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  className="form-control"
                  value={formData.prenom}
                  onChange={(e) => handleChange("prenom", e.target.value)}
                  required
                />
              </div>

              {/* Nom */}
              <div className="mb-3">
                <label className="form-label">Nom</label>
                <input
                  type="text"
                  name="nom"
                  className="form-control"
                  value={formData.nom}
                  onChange={(e) => handleChange("nom", e.target.value)}
                  required
                />
              </div>

              {/* Pays */}
              <div className="mb-3">
                <label className="form-label">Pays</label>
                <Select
                  options={countries}
                  name="pays"
                  value={countries.find((c) => c.value === formData.pays)}
                  onChange={(option) => handleChange("pays", option.value)}
                  placeholder="Choisissez votre pays"
                />
              </div>

              {/* Téléphone */}
              <div className="mb-3">
                <label className="form-label">Téléphone</label>
                <PhoneInput
                  country={defaultCountry}
                  value={formData.telephone}
                  name="phone"
                  onChange={(phone) => handleChange("telephone", phone)}
                  inputClass="form-control"
                  containerClass="w-100"
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Adresse email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>

              {/* Mot de passe */}
              <div className="mb-3">
                <label className="form-label">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                />
              </div>

              {/* Confirmation */}
              <div className="mb-3">
                <label className="form-label">Confirmer mot de passe</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  required
                />
              </div>

              {/* Bouton */}
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Je m’inscris
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InscriptionCandidat;
