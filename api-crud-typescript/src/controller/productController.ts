import type { Request, Response, NextFunction } from 'express';
import productRepository from '../repositories/productRepository';
import Product from '../models/product';

async function getProduct(req: Request, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id ?? '');
  const product = await productRepository.getProduct(id);
  if (product) res.json(product);
  else res.sendStatus(404);
}

async function getProducts(req: Request, res: Response, next: NextFunction) {
  const produts = await productRepository.getProducts();
  res.json(produts);
}

async function postProduct(req: Request, res: Response, next: NextFunction) {
  const product = req.body as Product;
  const result = await productRepository.addProducts(product);
  res.status(201).json(result);
}

async function patchProduct(req: Request, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id ?? '');
  const productData = req.body as Product;
  const result = await productRepository.updateProduct(id, productData);
  res.json(result);
}

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id ?? '');
  const result = await productRepository.deleteProduct(id);
  if (result) res.sendStatus(204);
  else res.sendStatus(404);
}

export default {
  getProduct,
  getProducts,
  postProduct,
  patchProduct,
  deleteProduct,
};
