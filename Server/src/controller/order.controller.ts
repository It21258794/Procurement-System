import { Request, Response } from 'express';
import orderService from '../services/order.service';
import orderModel from '../models/order/order.model';

import Orders from '../services/order.service'; 

const sendOrder = (req: Request, res: Response) => {
  try {
    const { order_id, email } = req.body;

    console.log(order_id, email);
    orderService.sendOrderByEmail(order_id, email);

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
    const order = await orderService.createOrder(orderDetails);
    res.status(200).json(order);
  } catch (err: any) {
    res.status(401).send({ err: err });
  }
};



const budgetApprove = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId; 
    const isApproved = await orderService.approveOrder(orderId);

    if (isApproved) {
      res.status(200).json({ message: 'Order approved successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err: any) {
    res.status(400).json({ err: err.message });
  }
};

const getAllApprovedOrders = async (req: Request, res: Response) => {
  try {
    const approvedOrders = await orderService.getAllApprovedOrders();

    if (approvedOrders && approvedOrders.length > 0) {
      res.status(200).json({ approvedOrders });
    } else {
      res.status(404).json({ message: 'No approved orders found' });
    }
  } catch (err: any) {
    res.status(400).json({ err: err.message });
  }
};

const budgetReject = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.orderId; 
      const isRejected = await orderService.rejectOrder(orderId);
      if (isRejected) {
        res.status(200).json({ message: 'Order rejected successfully' });
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (err: any) {
      res.status(400).json({ err: err });
    }
  };
 

export default { sendOrder, createOrder,budgetReject, budgetApprove,getAllApprovedOrders };
