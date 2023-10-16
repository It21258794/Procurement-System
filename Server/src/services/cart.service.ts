import cartModel from '../models/cart/cart.model';

const createCart = async (orderDetails: any) => {
  try {
    const newOrder = await orderDetails.save();
    return newOrder;
  } catch (err) {
    throw err;
  }
};

async function getCartItems(): Promise<any[]> {
  console.log('Fetching all items');
  try {
    const items = await cartModel.find({});
    console.log('Found items:', items);
    return items;
  } catch (err) {
    throw err;
  }
}

async function clearCart(itemId: string): Promise<boolean> {
  try {
    const deletedItem = await cartModel.deleteMany();

    return true;
  } catch (err) {
    throw err;
  }
}

export default {
  createCart,
  getCartItems,
  clearCart,
};
