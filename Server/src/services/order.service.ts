import Order from '../models/order/order.model';

async function createOrderService(orderDetails: any): Promise<any> {
  try {
    const createdItem = await orderDetails.save();
    return createdItem;
  } catch (err) {
    console.error('Error creating order:', err);
    throw err;
  }
}

export default { createOrderService };
