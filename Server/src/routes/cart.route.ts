import { Router } from 'express';
import cartController from '../controller/cart.controller';

//exporting cart route to be used
export const cartRoute = Router();

//routes related to cart
cartRoute.post('/createCart', cartController.createCart);
cartRoute.get('/getCart', cartController.getCartItems);
cartRoute.delete('/deleteItem/:itemId', cartController.deleteCartItem);
cartRoute.put('/updateCart/:itemId', cartController.updateCartItem);
cartRoute.delete('/clearCart', cartController.clearCart);
