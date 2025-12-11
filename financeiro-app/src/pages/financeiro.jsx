import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Financeiro() {
  const [lista, setLista] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // Campos do formulário
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("saida");
  const [formaPagamento, setFormaPagamento] = useState("pix");
  const [data, setData] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // -----------------------------------------------------------
  // CARREGAR LISTA
  // -----------------------------------------------------------
  const carregar = useCallback(async () => {
    try {
      const { data } = await api.get("/v1/financeiro", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLista(data);

    } catch (error) {
      console.error("Erro ao carregar financeiro:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      alert("Erro ao carregar os lançamentos.");
    }
  }, [token, navigate]);

  // Carregar categorias para o select
  const carregarCategorias = useCallback(async () => {
    try {
      const { data } = await api.get("/v1/categoria", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategorias(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  }, [token]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!mounted) return;
      await carregar();
      if (!mounted) return;
      await carregarCategorias();
    };

    load();

    return () => {
      mounted = false;
    };
  }, [carregar, carregarCategorias]);

  // -----------------------------------------------------------
  // SALVAR / ATUALIZAR
  // -----------------------------------------------------------
  async function salvar(e) {
    e.preventDefault();

    // normalize payload values to match backend validation (lowercase)
    const payload = {
      descricao,
      valor,
      tipo: tipo?.toString().toLowerCase(),
      formaPagamento: formaPagamento?.toString().toLowerCase(),
      data,
      categoriaId,
    };

    try {
      if (editId) {
        await api.put(`/v1/financeiro/${editId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('erro para criar - FINANCEIRO')
      } else {
        await api.post("/v1/financeiro", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("POST", token)
      }

      limparCampos();
      carregar();

    } catch (error) {
      console.error("Erro ao salvar:", error);

      if (error.response?.data?.erro) {
        alert(error.response.data.erro);
      } else if (error.response?.data?.erros) {
        alert(error.response.data.erros.join("\n"));
      } else {
        alert("Erro inesperado ao salvar.");
      }
    }
  }

  // -----------------------------------------------------------
  // REMOVER
  // -----------------------------------------------------------
  async function remover(id) {
    if (!window.confirm("Tem certeza que deseja excluir este lançamento?")) return;

    try {
      await api.delete(`/v1/financeiro/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      carregar();

    } catch (err) {
      console.error("Erro ao remover:", err);
      alert("Erro ao remover lançamento.");
    }
  }

  // -----------------------------------------------------------
  // EDITAR
  // -----------------------------------------------------------
  function editar(item) {
    setEditId(item.id);
    setDescricao(item.descricao);
    setValor(item.valor);
    // normalize incoming values to the expected lowercase form used by the backend
    setTipo(item.tipo?.toString().toLowerCase());
    setFormaPagamento(item.formaPagamento?.toString().toLowerCase());
    setCategoriaId(item.categoriaId);

    // ajustar a data ISO → yyyy-mm-dd
    const d = new Date(item.data);
    const yyyyMMdd = d.toISOString().substring(0, 10);

    setData(yyyyMMdd);
  }

  // -----------------------------------------------------------
  // LIMPAR
  // -----------------------------------------------------------
  function limparCampos() {
    setEditId(null);
    setDescricao("");
    setValor("");
    setTipo("saida");
    setFormaPagamento("pix");
    setCategoriaId("");
    setData("");
  }

  return (
    <div className="container mt-4">

      <h5 className="mb-4">
        <i className="bi bi-cash-coin me-2 fs-5"></i>
        FINANCEIRO
      </h5>

      <div className="row mt-4">

        {/* FORMULÁRIO */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <i className="bi bi-pencil-square me-2"></i>
              {editId ? "Editar Lançamento" : "Novo Lançamento"}
            </div>

            <div className="card-body">
              <form onSubmit={salvar}>

                <label className="form-label">Descrição</label>
                <input
                  className="form-control mb-3"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />

                {/* VALOR + DATA (mesma linha) */}
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">Valor</label>
                    <input
                      type="number"
                      className="form-control mb-3"
                      value={valor}
                      onChange={(e) => setValor(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Data</label>
                    <input
                      type="date"
                      className="form-control mb-3"
                      value={data}
                      onChange={(e) => setData(e.target.value)}
                    />
                  </div>
                </div>

                <label className="form-label">Forma de Pagamento</label>
                <select
                  className="form-select mb-3"
                  value={formaPagamento}
                  onChange={(e) => setFormaPagamento(e.target.value)}
                >
                  <option value="pix">PIX</option>
                  <option value="dinheiro">Dinheiro</option>
                  <option value="credito">Crédito</option>
                  <option value="debito">Débito</option>
                </select>

                {/* TIPO + CATEGORIA (mesma linha) */}
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">Tipo</label>
                    <select
                      className="form-select mb-3"
                      value={tipo}
                      onChange={(e) => setTipo(e.target.value)}
                    >
                      <option value="entrada">Entrada</option>
                      <option value="saida">Saída</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Categoria</label>
                    <select
                      className="form-select mb-3"
                      value={categoriaId}
                      onChange={(e) => setCategoriaId(e.target.value)}
                    >
                      <option value="">Selecione...</option>
                      {categorias.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button className="btn btn-success w-100">
                  <i className="bi bi-check-lg me-2"></i>
                  {editId ? "Atualizar" : "Cadastrar"}
                </button>

              </form>

            </div>
          </div>
        </div>

        {/* TABELA */}
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">
              <i className="bi bi-list-ul me-2"></i>
              Lista de Lançamentos
            </div>

            <div className="card-body p-0">
              <table className="table table-hover table-dark mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Categoria</th>
                    <th>Tipo</th>
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {lista.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{new Date(item.data).toLocaleDateString("pt-BR")}</td>
                      <td>{item.descricao}</td>
                      <td>R$ {item.valor.toFixed(2)}</td>
                      <td>{item.Categorium?.nome}</td>
                      <td>{item.tipo}</td>

                      <td className="text-center" style={{ width: "150px" }}>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => editar(item)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => remover(item.id)}
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
