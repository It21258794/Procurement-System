import { Router } from 'express';
import paymentController from '../controller/payment.controller';
export const paymentRoute = Router();
// Route needed
paymentRoute.post('/insertPayment', paymentController.insertPayment);
paymentRoute.get('/getPaymentBySupplierId/:supplierId', paymentController.getPayemtDetails);
paymentRoute.post('/createPaymentItem', paymentController.createPaymentItem);