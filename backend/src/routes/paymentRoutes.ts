import { Router } from 'express';
import PaymentController from '../controllers/PaymentController';

const router = Router();

router.get('/', PaymentController.getAll);
router.get('/user/:cpf', PaymentController.getUserPayments);
router.post('/create', PaymentController.create);

router.get('/card/all', PaymentController.getAllCards);
router.post('/card/check', PaymentController.getCard);
router.get('/card/cardNumber/:cardNumber', PaymentController.getCardByNumber);
router.get('/card/user/:cpf', PaymentController.getUserCards);
router.post('/card', PaymentController.addCard);
router.delete('/card/cardNumber/:cardNumber', PaymentController.deleteCard);

router.get('/card/balance/cardNumber/:cardNumber', PaymentController.getCardBalance);
router.post('/card/balance/add', PaymentController.addCardBalance);
router.post('/card/balance/remove', PaymentController.removeCardBalance);

export default router;