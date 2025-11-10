const API_URL = 'http://localhost:3000/produtos';
const lista = document.getElementById('lista-produtos');
const form = document.getElementById('produto-form');
const nomeInput = document.getElementById('nome');
const precoInput = document.getElementById('preco');

// Carregar produtos ao iniciar
async function carregarProdutos() {
    const res = await fetch(API_URL, {
        'method': 'GET'
    });
    const produtos = await res.json();
    lista.innerHTML = '';

    if (produtos.length === 0) {
        lista.innerHTML = `<tr><td colspan="4" class="text-muted">Nenhum produto cadastrado.</td></tr>`;
        return;
    }

    produtos.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-warning me-2" onclick="editarProduto(${produto.id}, '${produto.nome}', ${produto.preco})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="deletarProduto(${produto.id})">Excluir</button>
            </td>
        `;
        lista.appendChild(tr);
    });
}

// Adicionar novo produto
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = nomeInput.value.trim();
    const preco = parseFloat(precoInput.value);

    if (!nome || isNaN(preco)) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, preco })
    });

    nomeInput.value = '';
    precoInput.value = '';
    carregarProdutos();
});

// Deletar produto
async function deletarProduto(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        carregarProdutos();
    }
}

// Editar produto
async function editarProduto(id, nomeAtual, precoAtual) {
    const novoNome = prompt('Novo nome:', nomeAtual);
    const novoPreco = parseFloat(prompt('Novo preço:', precoAtual));

    if (novoNome && !isNaN(novoPreco)) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: novoNome, preco: novoPreco })
        });
        carregarProdutos();
    }
}

carregarProdutos();