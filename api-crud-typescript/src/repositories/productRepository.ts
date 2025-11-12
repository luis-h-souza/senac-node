import Product from '../models/product';

// tipo a variável com a classe de Produtos e defino um array
const products: Product[] = [];

// lista produtos pelo ID
async function getProduct(id: number): Promise<Product | undefined> {
  return products.find(product => product.id === id);
}

// lista todos os produtos
async function getProducts(): Promise<Product[]> {
  return products;
}

// adiciona um produto
async function addProducts(product: Product): Promise<Product> {
  if (!product.nome || !product.preco) {
    throw new Error(`Produtos inválidos.`);
  }

  const newProduct = new Product(product.nome, product.preco);
  products.push(newProduct);

  return newProduct;
}

// atualiza um produto
// Partial - deixa eu atualizar alguns campos, não necessariamente todos (PATCH)
async function updateProduct(
  id: number,
  productData: Partial<Product>
): Promise<Product> {
  const product = products.find(product => product.id === id);
  if (!product) throw new Error(`Produto não enconrado.`);

  if (productData.nome) product.nome = productData.nome;
  if (productData.preco) product.preco = productData.preco;

  return product;
}

// deleta um produto
async function deleteProduct(id: number): Promise<boolean> {
  const index = products.findIndex(product => product.id === id);
  if (index === -1) return false;

  products.splice(index, 1);

  return true;
}

export default {
  getProduct,
  getProducts,
  addProducts,
  updateProduct,
  deleteProduct,
};
