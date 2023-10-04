import { Request, Response } from 'express';
import itemService from  '../services/item.service';

// Function to insert a new item
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

// Function to find items by name
  const findItemsByName = async (req: Request, res: Response) => {
    try {
      const itemName = req.params.itemname as string;
      const items = await itemService.findItemsByName(itemName);
      res.status(200).json(items);
    } catch (err: any) {
      res.status(400).json({ err: err.message }); 
    }
  };

// Function to update an existing item
  const updateItem = async (req: Request, res: Response) => {
    try {
      const itemId = req.params.itemId; 
      const updatedData = req.body;
      const updatedItem = await itemService.updateItem(itemId, updatedData);
      res.status(200).json(updatedItem);
    } catch (err: any) {
      res.status(400).json({ err: err.message });
    }
  };
  
// Function to delete an item by ID
  const deleteItem = async (req: Request, res: Response) => {
    try {
      const itemId = req.params.itemId; 
      const isDeleted = await itemService.deleteItem(itemId);
      if (isDeleted) {
        res.status(200).json({ message: 'Item deleted successfully' });
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } catch (err: any) {
      res.status(400).json({ err: err.message });
    }
  };
  // Function to get All items
  const getAllItem = async (req: Request, res: Response) => {
    try {
      console.log("itemController")
      const items = await itemService.getAllItems();
      res.status(200).json(items);
    } catch (err: any) {
      res.status(400).json({ err: err.message }); 
    }
  };
// Export all the controller functions for use in routes
  export default { insertItem,updateItem,deleteItem,findItemsByName,getAllItem};