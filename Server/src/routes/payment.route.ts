import { Router } from 'express';
import paymentController from '../controller/payment.controller';
import AuthGuard from '../utils/authGuard';
export const paymentRoute = Router();
// Route needed
paymentRoute.post('/insertPayment', paymentController.insertPayment);
paymentRoute.get(
  '/getPaymentBySupplierId/:supplierId',
  paymentController.getPayemtDetails,
);
paymentRoute.post('/createPaymentItem',AuthGuard, paymentController.createPaymentItem);
 paymentRoute.post('/sendPaymentReceipt', AuthGuard, paymentController.sendReceipt);
