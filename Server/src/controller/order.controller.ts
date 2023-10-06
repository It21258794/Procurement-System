import { Request, Response } from 'express';
import orderService from '../services/order.service';

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

export default { sendOrder };
