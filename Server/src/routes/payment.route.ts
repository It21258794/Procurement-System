import { Router } from 'express';
import paymentController from '../controller/payment.controller';
export const paymentRoute = Router();
// Route needed
paymentRoute.post('/insertPayment', paymentController.insertPayment);
