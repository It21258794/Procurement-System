import { Router } from 'express';
import itemController from '../controller/item.controller';

export const itemRoute = Router();

itemRoute.post('/createItem', itemController.insertItem);
itemRoute.get('/getItembyname/:itemname', itemController.findItemsByName);
itemRoute.put('/updateItem/:itemId', itemController.updateItem);
itemRoute.delete('/deleteItem/:itemId', itemController.deleteItem);
