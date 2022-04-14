import { Router } from 'express';
import CouponController from '../controllers/CouponController';

const router = Router();

router.post('/', CouponController.create);
router.get('/', CouponController.getAll);
router.get('/name', CouponController.getByName);

export default router;