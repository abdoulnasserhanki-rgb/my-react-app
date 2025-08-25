import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/emploie/home";
import Login from "./login";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Accueil from "./pages/accueil";
import InscriptionChoix from "./pages/inscription";
import InscriptionCandidat from "./pages/inscriptionCandidat";
import InscriptionEmployer from "./pages/inscriptionEmployeur";
import 'react-phone-input-2/lib/style.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route index element={<Accueil />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<InscriptionChoix />} />
            <Route path="/register/candidate" element={<InscriptionCandidat />} />
            <Route path="/register/employer" element={<InscriptionEmployer />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
