import { Request, Response } from 'express';
import cartService from '../services/cart.service';
import cartModel from '../models/cart/cart.model';

//add cart items
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

//get all cart items
const getCartItems = async (req: Request, res: Response) => {
  try {
    console.log('itemController');
    const items = await cartService.getCartItems();
    res.status(200).json(items);
  } catch (err: any) {
    res.status(400).json({ err: err.message });
  }
};

//delete cart item
const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.itemId;
    const isDeleted = await cartService.deleteCartItem(itemId);

    res.status(200).json({ message: 'Cart cleared' });
  } catch (err: any) {
    res.status(400).json({ err: err.message });
  }
};

//update cart item
const updateCartItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.itemId;
    const updatedData = req.body;
    const updatedItem = await cartService.updateCartItem(itemId, updatedData);
    res.status(200).json(updatedItem);
  } catch (err: any) {
    res.status(400).json({ err: err.message });
  }
};

//clear cart item
const clearCart = async (req: Request, res: Response) => {
  try {
    const updatedItem = await cartService.clearCart();
    res.status(200).json(updatedItem);
  } catch (err: any) {
    res.status(400).json({ err: err.message });
  }
};

export default {
  createCart,
  getCartItems,
  deleteCartItem,
  updateCartItem,
  clearCart,
};
