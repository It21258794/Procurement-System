import { Router } from 'express';
import orderController from '../controller/order.controller';
import AuthGuard from '../utils/authGuard';

export const orderRoute = Router();

orderRoute.post('/sendOrderEmail', orderController.sendOrder);
orderRoute.post('/createOrder', orderController.createOrder);

orderRoute.post('/reject/:id', orderController.budgetReject);
orderRoute.post('/approve/:id', orderController.budgetApprove);

// All approved orders
orderRoute.get('/approved', orderController.getAllApprovedOrders);

orderRoute.get('/getSiteOrder/:siteId', orderController.getOrderBySite);
orderRoute.get('/getOrderById/:orderId', orderController.getOrderById);
