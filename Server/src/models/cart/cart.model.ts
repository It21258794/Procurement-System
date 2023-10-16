import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
  supplierId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const order = mongoose.model('cart', cartSchema);
export default order;
