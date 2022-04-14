import { Router } from 'express';
import SessionController from '../controllers/SessionController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const router = Router();

router.post('/create', SessionController.create);
router.post('/refresh', SessionController.refresh);

export default router;