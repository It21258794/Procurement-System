import { Router } from 'express';
import orderController from '../controller/order.controller';
import AuthGuard from '../utils/authGuard';

export const orderRoute = Router();

orderRoute.post('/sendOrderEmail', orderController.sendOrder);
orderRoute.post('/createOrder', orderController.createOrder);



orderRoute.get('/getSiteOrder/:siteId', orderController.getOrderBySite);
orderRoute.get('/getOrderById/:orderId', orderController.getOrderById);
orderRoute.put('/setStatus', orderController.changeStatus);
