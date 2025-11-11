const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// permite requisições externas
//app.use(cors()) // permite todas as requisições

// permissão específica
app.use(cors({origin: 'http://127.0.0.1:5500'}))

app.use(express.json());

let produtos = [
  { id: 1, nome: 'iPhone 14', preco: 3500 },
  { id: 2, nome: 'Notebook CCE', preco: 1500 },
  { id: 3, nome: 'Motorola MOTO G', preco: 1000 },
];
let nextId = 4;

app.get('/produtos', (req, res) => {
  return res.status(200).send(produtos)
})

app.post('/produtos', (req, res) => {
  const { nome, preco } = req.body

  if (!nome || !preco) {
    return res.status(400).send({ message: "Nome e preço devem ser preenchidos." })
  }

  const novoProduto = {
    id: nextId++,
    nome,
    preco
  }

  produtos.push(novoProduto)
  return res.status(201).send(novoProduto)
})

app.put('/produtos/:id', (req, res) => {
  // converter para Inteiro, pois a informação que vem da URL vem como string
  const id = parseInt(req.params.id)
  const { nome, preco } = req.body

  // localiza o indice do array a ser alterado
  const indice = produtos.findIndex(produtoAtual => produtoAtual.id === id)

  if (indice === -1) {
    return res.status(404).send({ message: "Produto não encontrado." })
  }

  if (!nome || !preco) {
    return res.status(400).send({ message: "Nome e preço devem ser obrigatórios." })
  }

  produtos[indice] = { id, nome, preco }

  return res.status(200).send(produtos)
})

app.delete('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const tamanhoInicial = produtos.length

  // filtra o ARRAY, mantendo os produtos diferentes do ID recebido
  produtos = produtos.filter(produtoAtual => produtoAtual.id !== id)

  if (produtos.length === tamanhoInicial) {
    return res.status(404).send({ message: "Produto não encontrado." })
  }

  return res.status(204).send()
})

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
