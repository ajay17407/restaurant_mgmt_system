import express from 'express';
import { mockPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/mock-payment',mockPayment);

export default router;