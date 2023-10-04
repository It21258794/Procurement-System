import { Request, Response } from 'express';
import paymentService from '../services/payment.service';
// Function to insert a new payment
const insertPayment = async (req: Request, res: Response) => {
    try {
        console.log("itemController")
      const dto = req.body;
      const item = await paymentService.insertPayment(dto);
      res.status(200).json(item);
    } catch (err: any) {
      res.status(400).json({ err: err });
    }
  };

  export default { insertPayment};
