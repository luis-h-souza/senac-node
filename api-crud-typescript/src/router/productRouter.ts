import express from 'express';
import productController from '../controller/productController';

const router = express.Router();

router.get('/:id', productController.getProduct);

router.get('/', productController.getProducts);

router.post('/', productController.postProduct);

router.patch('/:id', productController.patchProduct);

router.delete('/:id', productController.deleteProduct);

export default router;
