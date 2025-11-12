export default class Product {
  id: number;
  nome: string;
  preco: number;

  private static nestId = 1;

  constructor(nome: string, preco: number) {
    this.id = Product.nestId++;
    this.nome = nome;
    this.preco = preco;
  }
}
