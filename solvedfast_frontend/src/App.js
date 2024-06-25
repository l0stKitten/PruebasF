import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Welcome from "./Pages/Welcome";
import Clientes from "./Pages/Clientes";
import Menu from "./Components/Menu";

export default function App() {
  return (
    <Router>
      <main>
        <Menu />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/clientes" element={<Clientes />} />
        </Routes>
        <ToastContainer />
      </main>
    </Router>
  );
}
