import { Request, Response } from 'express';
import orderService from '../services/order.service';
import orderModel from '../models/order/order.model';

import Orders from '../services/order.service';
import { error } from 'winston';

const sendOrder = (req: Request, res: Response) => {
  try {
    const { order_id, email, pdf } = req.body;

    console.log(order_id, email);
    orderService.sendOrderByEmail(order_id, email, pdf);

    res.status(401).send('Order Send via Email');
  } catch (err: any) {
    res.status(401).send({ err: err });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const getOrderId = await orderService.getOrderId();
    req.body.orderId = getOrderId;

    const orderDetails = new orderModel(req.body);
    console.log(orderDetails);
    const order = await orderService.createOrder(orderDetails);
    res.status(200).json(order);
  } catch (err: any) {
    res.status(401).send({ err: err });
  }
};

const getOrderBySite = async (req: Request, res: Response) => {
  try {
    const { siteId } = req.params;

    const order = await orderService.getOrderBySite(siteId);
    res.status(200).json(order);
  } catch (err: any) {
    res.status(401).send({ err: err });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    console.log('here');
    const { orderId } = req.params;

    const foundOrder = await orderService.getOrderById(orderId);
    res.status(200).json(foundOrder);
  } catch (err: any) {
    res.status(401).send({ err: err });
  }
};

const changeStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;
    const item = await orderService.changeOrderStatus(orderId, status);
    res.status(200).json(item);
  } catch (err: any) {
    res.status(401).send({ err: err });
  }
};

const getOrderAndBudget = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const { orderItem, budget } = await orderService.getOrderAndBudget(orderId);
    res.status(200).json({ orderItem, budget });
  } catch (err: any) {
    res.status(401).send({ err: err });
  }
};

const deleteOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedItem = await orderService.deleteOrder(id);
    res.status(200).json({ deletedItem });
  } catch (err: any) {
    res.status(401).send({ err: err });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const fountItem = await orderService.getOrderByMonth();
    res.status(200).json({ fountItem });
  } catch (err: any) {
    res.status(401).send({ err: err });
  }
};

//get all orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orderRequests = await orderService.getAllOrders();

    if (orderRequests && orderRequests.length > 0) {
      res.status(200).json(orderRequests);
    } else {
      res.status(404).json({ message: 'No order found' });
    }
  } catch (err: any) {
    res.status(400).json({ err: err.message });
  }
};

export default {
  getAllOrders,
  sendOrder,
  createOrder,
  getOrderBySite,
  getOrderById,
  changeStatus,
  getOrderAndBudget,
  deleteOrderById,
  getOrders,
};
