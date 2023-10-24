import { Request, Response } from 'express';
import paymentService from '../services/payment.service';
import { IPaymentItem } from '../models/paymentItem/IPayemntItem';
// import createTemplate from '../../../Client/src/components/procurementManager/payment/receipt-template'
import orderService from '../services/order.service';
// Function to insert a new payment
const insertPayment = async (req: Request, res: Response) => {
  try {
    console.log('itemController');
    const dto = req.body;
    const item = await paymentService.insertPayment(dto);
    res.status(200).json(item);
  } catch (err: any) {
    res.status(400).json({ err: err });
  }
};


//get paymnet details controller
const getPayemtDetails = async (req: Request, res: Response) => {
  try {
    const { supplierId } = req.params;
    const item = await paymentService.getPayemtDetailsBySupplier(supplierId);
    res.status(200).json(item);
  } catch (err: any) {
    res.status(400).json({ err: err });
  }
};

// make a payment controller
const createPaymentItem = async (req: Request, res: Response) => {
  try {
    const dto = req.body;
    console.log(dto);
    const paymentItem = await paymentService.createPayment(dto);
    res.status(200).json(paymentItem);
  } catch (err: any) {
    res.status(400).json({ err: err });
  }
};


//controller to call email service
const sendReceipt = (req: Request, res: Response) => {
  try {
    const { order_id, email ,pdf } = req.body;

    orderService.sendOrderByEmail(order_id,email,pdf);

    res.status(401).send('Order Send via Email');
  } catch (err: any) {
    res.status(401).send({ err: err });
  }
};

export default { insertPayment, getPayemtDetails, createPaymentItem,sendReceipt };
