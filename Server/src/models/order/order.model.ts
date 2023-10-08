import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    require: true,
  },
  supplierId: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  requiredDate: {
    type: Date,
    require: true,
  },
  quantity: {
    type: Date,
    require: true,
  },
  description: {
    type: Date,
    require: false,
  },
});

const order = mongoose.model('order', orderSchema);
export default order;
