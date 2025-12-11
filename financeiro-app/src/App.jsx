import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Registrar from "./pages/registrar";
import Categorias from "./pages/categorias";
import Financeiro from "./pages/financeiro";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<h2 className="text-center mt-4">Bem-vindo ao Financeiro</h2>} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/financeiro" element={<Financeiro />} />
      </Routes>
    </BrowserRouter>
  );
}
