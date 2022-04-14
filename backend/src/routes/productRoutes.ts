import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const router = Router();

router.post('/', ProductController.create);
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.post('/filter', ProductController.getAllWithFilter);
router.delete('/:id', ProductController.deleteById)

export default router;