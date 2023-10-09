import mongoose from 'mongoose';
import { OrderStatus } from './OrderStatus';

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    requiredDate: {
      type: Date,
      required: true,
    },
    items: [
      {
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
      },
    ],
    status: {
      type: String,
      default: OrderStatus.PENDING,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const order = mongoose.model('order', orderSchema);
export default order;
