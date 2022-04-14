import { Router } from 'express';
import UserController from '../controllers/UserController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const router = Router();

router.get('/all', UserController.getAll);
router.get('/get/:cpf', UserController.get); // colocar middleware ensureAuthenticated
router.get('/get/email/:email', UserController.getByEmail); // colocar middleware ensureAuthenticated
router.post('/create', UserController.create);
router.patch('/edit/:cpf', UserController.update); // colocar middleware ensureAuthenticated
router.patch('/edit/password/:cpf', UserController.updatePassword); // colocar middleware ensureAuthenticated
router.delete('/delete/:cpf', UserController.delete); // colocar middleware ensureAuthenticated
router.post('/recovery-password', UserController.recoveryPassword);
router.post('/code-verification', UserController.codeVerificationValidate);

router.post('/cart/calculate', UserController.calculateCart);
router.get('/cart/:cpf', UserController.getAllCart);
router.post('/cart', UserController.addCart);
router.delete('/cart', UserController.deleteCart);
router.delete('/cart/:cpf', UserController.deleteAllCart);

export default router;