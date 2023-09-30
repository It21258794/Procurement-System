import { Router } from 'express';
import itemController from '../controller/item.controller';

export const itemRoute = Router();

itemRoute.post('/createItem', itemController.insertItem);