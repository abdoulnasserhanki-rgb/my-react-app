import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { getNames } from "country-list";
import Select from "react-select";
import "react-phone-input-2/lib/style.css";

function InscriptionEmployer() {
  const [form, setForm] = useState({
    nomSociete: "",
    adresse: "",
    secteur: "",
    description: "",
    codePostal: "",
    rue: "",
    pays: "",
    telephone: "",
    email: "",
    civilite: "",
    prenom: "",
    nom: "",
    posteEntreprise: "",
    telephoneContact: "",
    password: "",
    confirmPassword: "",
  });
  const [countries, setCountries] = useState([]);
  const [defaultCountry, setDefaultCountry] = useState("ne"); // Niger par défaut

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
          setForm((prev) => ({ ...prev, pays: data.country_name }));
        }
        if (data.country_code) {
          setDefaultCountry(data.country_code.toLowerCase());
        }
      });
  }, []);

  // Gestion des changements
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("⚠️ Les mots de passe ne correspondent pas !");
      return;
    }
    console.log("Données soumises :", form);
    alert("✅ Inscription réussie !");
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Inscription Employeur</h2>

            <form>
              {/* --- Informations sur l'entreprise --- */}
              <h5 className="mb-3 text-primary">Informations sur l'entreprise</h5>

              <div className="mb-3">
                <label className="form-label">Nom de la société</label>
                <input type="text" className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Adresse</label>
                <input type="text" className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Secteur d'activité</label>
                <input type="text" className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Description de l'entreprise</label>
                <textarea className="form-control" rows="3"></textarea>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Code postal</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Rue</label>
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Pays</label>
                <Select
                  options={countries}
                  value={countries.find((c) => c.value === form.pays)}
                  onChange={(option) => handleChange("pays", option.value)}
                  placeholder="Choisissez votre pays"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Téléphone de l'entreprise</label>
                <PhoneInput
                  country={defaultCountry}
                  value={form.telephone}
                  onChange={(phone) => handleChange("telephone", phone)}
                  inputClass="form-control"
                  containerClass="w-100"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">E-mail de l'entreprise</label>
                <input type="email" className="form-control" required />
              </div>

              {/* --- Informations sur le représentant --- */}
              <h5 className="mt-4 mb-3 text-primary">Informations sur le représentant</h5>

              <div className="mb-3">
                <label className="form-label">Civilité</label>
                <select className="form-select">
                  <option>M.</option>
                  <option>Mme</option>
                  <option>Mlle</option>
                </select>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Prénom</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nom</label>
                  <input type="text" className="form-control" required />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Poste dans l'entreprise</label>
                <input type="text" className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Téléphone du représentant</label>
                <PhoneInput
                  country={defaultCountry}
                  value={form.telephone}
                  onChange={(phone) => handleChange("telephone", phone)}
                  inputClass="form-control"
                  containerClass="w-100"
                />
              </div>

              {/* --- Mot de passe --- */}
              <h5 className="mt-4 mb-3 text-primary">Sécurité du compte</h5>

              <div className="mb-3">
                <label className="form-label">Mot de passe</label>
                <input type="password" className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirmer le mot de passe</label>
                <input type="password" className="form-control" required />
              </div>

              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-success">
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

export default InscriptionEmployer;
