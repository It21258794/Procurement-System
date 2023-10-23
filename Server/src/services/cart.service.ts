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

async function deleteCartItem(itemId: string): Promise<boolean> {
  try {
    const deletedItem = await cartModel.deleteOne({ _id: itemId });

    if (deletedItem.deletedCount === 1) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
}

async function updateCartItem(itemId: string, updatedData: any): Promise<any> {
  try {
    const updatedItem = await cartModel.findByIdAndUpdate(itemId, updatedData);

    if (!updatedItem) {
      throw new Error('Item not found in cart');
    }
    return updatedItem;
  } catch (err) {
    throw err;
  }
}

export default {
  createCart,
  getCartItems,
  deleteCartItem,
  updateCartItem,
};
