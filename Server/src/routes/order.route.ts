import { Router } from 'express';
import orderController from '../controller/order.controller';
import AuthGuard from '../utils/authGuard';

export const orderRoute = Router();

orderRoute.post('/sendOrderEmail', orderController.sendOrder);
