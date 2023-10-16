import { Router } from 'express';
import cartController from '../controller/cart.controller';

export const cartRoute = Router();

cartRoute.post('/createCart', cartController.createCart);
cartRoute.get('/getCart', cartController.getCartItems);
cartRoute.delete('/clearCart', cartController.clearCart);
cartRoute.put('/clearCart', cartController.updateCartItem);
