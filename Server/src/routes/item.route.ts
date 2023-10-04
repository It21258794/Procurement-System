import { Router } from 'express';
import itemController from '../controller/item.controller';
// Export the itemRoute for use in your application
export const itemRoute = Router();
// Route needed
itemRoute.post('/createItem', itemController.insertItem);
itemRoute.get('/getItembyname/:itemName',itemController.findItemsByName);
itemRoute.put('/updateItem/:itemId', itemController.updateItem);
itemRoute.delete('/deleteItem/:itemId', itemController.deleteItem);
itemRoute.get('/getAllItem',itemController.getAllItem);