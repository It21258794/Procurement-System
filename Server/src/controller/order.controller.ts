import express, { Request, Response } from 'express';
import Order from '../models/order/order.model';
import orderService from '../services/order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderDetails = new Order(req.body);
    const savedOrder = await orderService.createOrderService(orderDetails);
    res.status(201).json({ isSuccessful: true, order: savedOrder });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export default { createOrder };
