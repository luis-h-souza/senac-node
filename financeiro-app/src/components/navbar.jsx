import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <div className="container">
        <Link className="navbar-brand" to="/">Financeiro App</Link>

        <div>
          <Link className="btn btn-outline-light btn-sm me-2" to="/financeiro">Financeiro</Link>
          <Link className="btn btn-outline-light btn-sm me-2" to="/categorias">Categorias</Link>
          <Link className="btn btn-outline-light btn-sm me-2" to="/login">Login</Link>
          <Link className="btn btn-outline-light btn-sm" to="/registrar">Registrar</Link>
        </div>
      </div>
    </nav>
  );
}
