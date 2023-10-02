import { Request, Response } from 'express';
import paymentService from '../services/payment.service';

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


  const getbySupplierid = async (req: Request, res: Response) => {
    try {
      const supplierid = req.params.supplierid as string;
      const payment = await paymentService.getbySupplierid(supplierid);
      res.status(200).json(payment);
    } catch (err: any) {
      res.status(400).json({ err: err.message }); 
    }
  };


  const updateItem = async (req: Request, res: Response) => {
    try {
      const itemId = req.params.paymentId; 
      const updatedData = req.body;
      const updatedItem = await paymentService.updatePayment(itemId, updatedData);
      res.status(200).json(updatedItem);
    } catch (err: any) {
      res.status(400).json({ err: err.message });
    }
  };
  
  export default { insertPayment,updateItem,getbySupplierid};
