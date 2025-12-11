import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Categorias() {
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [editId, setEditId] = useState(null);

  // Carregar token do localStorage (ou onde você guardar)
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const carregar = useCallback(async () => {
    try {
      const { data } = await api.get("/v1/categoria", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLista(data);

    } catch (error) {
      console.error("Erro ao carregar categorias:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      alert("Erro ao carregar categorias.");
    }
  }, [token, navigate]);


  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!mounted) return;
      await carregar();
    };

    load();

    return () => {
      mounted = false;
    };
  }, [carregar]);

  async function salvar(e) {
    e.preventDefault();

    // client-side validation to avoid round-trip validation errors
    if (!nome || nome.trim().length < 3) {
      alert('O nome deve ter pelo menos 3 caracteres.');
      return;
    }
    if (!descricao || descricao.trim().length < 3 || descricao.trim().length > 255) {
      alert('A descrição deve ter entre 3 e 255 caracteres.');
      return;
    }

    try {
      if (editId) {
        await api.put(`/v1/categoria/${editId}`,
          { nome, descricao },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await api.post(
          "/v1/categoria",
          { nome, descricao },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setNome("");
      setDescricao("");
      setEditId(null);
      carregar();

    } catch (error) {
      if (error.response?.data?.erro) {
        alert(error.response.data.erro);
      } else if (error.response?.data?.erros) {
        alert(error.response.data.erros.join("\n"));
      } else {
        console.error("Erro ao salvar categoria:", error);
        alert("Erro inesperado ao salvar.");
      }
    }
  }

  async function remover(id) {
    const confirmar = window.confirm("Tem certeza que deseja excluir esta categoria?");
    if (!confirmar) return;

    try {
      await api.delete(`/v1/categoria/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      carregar();
    } catch (error) {
      console.error("Erro ao remover categoria:", error);
      alert("Erro ao remover categoria.");
    }
  }

  function editar(cat) {
    setEditId(cat.id);
    setNome(cat.nome);
    setDescricao(cat.descricao);
  }

  return (
    <div className="container mt-4">

      <h5 className="mb-4">
        <i className="bi bi-tags-fill me-2 fs-5"></i>
        CATEGORIAS
      </h5>

      <div className="row mt-4">

        {/* CARD DO FORMULÁRIO */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <i className="bi bi-pencil-square me-2"></i>
              {editId ? "Editar Categoria" : "Nova Categoria"}
            </div>

            <div className="card-body">
              <form onSubmit={salvar}>
                <label className="form-label">Nome</label>
                <input
                  className="form-control mb-3"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <label className="form-label">Descrição</label>
                <input
                  className="form-control mb-3"
                  placeholder="Descrição"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  maxLength={255}
                />

                <button className="btn btn-success w-100">
                  <i className="bi bi-check-lg me-2"></i>
                  {editId ? "Atualizar" : "Cadastrar"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* CARD DA TABELA */}
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">
              <i className="bi bi-list-ul me-2"></i>
              Lista de Categorias
            </div>

            <div className="card-body p-0">
              <table className="table table-striped table-dark table-hover mb-0">
                <thead className="">
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {lista.map((cat) => (
                    <tr key={cat.id}>
                      <td>{cat.id}</td>
                      <td>{cat.nome}</td>
                      <td>{cat.descricao}</td>
                      <td className="text-center" style={{ width: "150px" }}>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => editar(cat)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => remover(cat.id)}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
