import { Router } from 'express';
import orderController from '../controller/order.controller';

export const orderRoute = Router();

orderRoute.post('/createOrder', orderController.createOrder);
