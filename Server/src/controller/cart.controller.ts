import { Request, Response } from 'express';
import cartService from '../services/cart.service';
import cartModel from '../models/cart/cart.model';

const createCart = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const cartDetails = new cartModel(req.body);
    const order = await cartService.createCart(cartDetails);
    res.status(200).json(order);
  } catch (err: any) {
    res.status(401).send({ err: err });
  }
};

const getCartItems = async (req: Request, res: Response) => {
  try {
    console.log('itemController');
    const items = await cartService.getCartItems();
    res.status(200).json(items);
  } catch (err: any) {
    res.status(400).json({ err: err.message });
  }
};

const clearCart = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.itemId;
    const isDeleted = await cartService.clearCart(itemId);

    res.status(200).json({ message: 'Cart cleared' });
  } catch (err: any) {
    res.status(400).json({ err: err.message });
  }
};

export default {
  createCart,
  getCartItems,
  clearCart,
};
