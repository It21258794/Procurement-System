import { Router } from 'express';
import orderController from '../controller/order.controller';
import AuthGuard from '../utils/authGuard';
import orderService from '../services/order.service';

export const orderRoute = Router();

orderRoute.post('/sendOrderEmail', orderController.sendOrder);
orderRoute.post('/createOrder', orderController.createOrder);

orderRoute.post('/reject/:id', orderController.budgetReject);
orderRoute.post('/approve/:id', orderController.budgetApprove);

// All approved orders
orderRoute.get('/approved', orderController.getAllApprovedOrders);

orderRoute.get('/getSiteOrder/:siteId',AuthGuard, orderController.getOrderBySite);
orderRoute.get('/getOrderById/:orderId',AuthGuard, orderController.getOrderById);
orderRoute.put('/setStatus', orderController.changeStatus);
orderRoute.get('/getOrderBudget/:orderId',AuthGuard, orderController.getOrderAndBudget);
orderRoute.delete('/deleteOrder/:id',AuthGuard,orderController.deleteOrderById)
