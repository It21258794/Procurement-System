import { Request, Response } from 'express';
import itemService from  '../services/item.service';


const insertItem = async (req: Request, res: Response) => {
    try {
        console.log("itemController")
      const dto = req.body;
      const item = await itemService.insertItem(dto);
      res.status(200).json(item);
    } catch (err: any) {
      res.status(400).json({ err: err });
    }
  };

  export default { insertItem };