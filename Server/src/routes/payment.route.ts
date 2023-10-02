import { Router } from 'express';
import paymentController from '../controller/payment.controller';
export const paymentRoute =Router();

paymentRoute.post('/insertPayment', paymentController.insertPayment);
paymentRoute.get('/getpaymentbysupplierid/:supplierid',paymentController.getbySupplierid);
paymentRoute.put('/updateItem/:paymentId', paymentController.updateItem);
