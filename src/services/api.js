import axios from "axios";

const API_URL = "http://localhost:8080/api"; // ton back-end Spring Boot

// 🔹 Inscription générique
export const registerUser = (user, type) => {
  return axios.post(`${API_URL}/${type}/register`, user,{
    headers: {
    "Content-Type": "application/json"
  }
  });
};

// 🔹 Connexion
export const loginUser = (email, password) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
};
