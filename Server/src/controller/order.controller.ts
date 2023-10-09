import { Request, Response } from 'express';
import orderService from '../services/order.service';
import orderModel from '../models/order/order.model';

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

const getOrderBySite = async (req:Request, res:Response) => {
  try{

    const {siteId}  = req.params;

    const order = await orderService.getOrderBySite(siteId);
    res.status(200).json(order);

  }catch(err:any){
    res.status(401).send({ err: err });
  }
}

const getOrderById = async (req:Request, res:Response) =>{
  try{
    const {orderId} = req.params;

    const foundOrder = await orderService.getOrderById(orderId);
    res.status(200).json(foundOrder);
  }catch(err:any){
    res.status(401).send({ err: err });
  }
}

export default { sendOrder, createOrder ,getOrderBySite,getOrderById};
