import { Router } from 'express';
import orderController from '../controller/order.controller';
import AuthGuard from '../utils/authGuard';
import orderService from '../services/order.service';

export const orderRoute = Router();


orderRoute.post('/createOrder', orderController.createOrder);

//get order per sites
orderRoute.get(
  '/getSiteOrder/:siteId',
  AuthGuard,
  orderController.getOrderBySite,
);

//get site order by providing individual ids
orderRoute.get(
  '/getOrderById/:orderId',
  AuthGuard,
  orderController.getOrderById,
);
orderRoute.put('/setStatus', orderController.changeStatus);
orderRoute.get(
  '/getOrderBudget/:orderId',
  AuthGuard,
  orderController.getOrderAndBudget,
);

//delete a perticular order by providing id
orderRoute.delete(
  '/deleteOrder/:id',
  AuthGuard,
  orderController.deleteOrderById,
);

//get get Orders By Month
orderRoute.get('/getOrdersByMonth', orderController.getOrders);


//get all orders supplier
orderRoute.get('/getAllOrders',orderController.getAllOrders)