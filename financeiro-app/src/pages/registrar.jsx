import { useState } from "react";
import api from "../api";

export default function Registrar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");

  async function enviar(e) {
    e.preventDefault();
    try {
      await api.post("/v1/auth/register", { nome, email, senha });
      setMsg("Usuário registrado!");
    } catch {
      setMsg("Erro ao registrar.");
    }
  }

  return (
    <div className="container mt-4" style={{maxWidth: "400px"}}>
      <h3>Registrar</h3>

      <form onSubmit={enviar}>
        <input className="form-control mb-2" placeholder="Nome"
          value={nome} onChange={e => setNome(e.target.value)} />

        <input className="form-control mb-2" placeholder="E-mail"
          value={email} onChange={e => setEmail(e.target.value)} />

        <input className="form-control mb-2" type="password" placeholder="Senha"
          value={senha} onChange={e => setSenha(e.target.value)} />

        <button className="btn btn-success w-100">Cadastrar</button>
      </form>

      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
}
