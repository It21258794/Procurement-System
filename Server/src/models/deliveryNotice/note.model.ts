import mongoose from 'mongoose';
import order from '../order/order.model'; // Import the Order model
const { Schema } = mongoose;

const noteSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'order',
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
  
    items:[
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
      }
    ],
    price: {
    type: Number,
          required: true,
        },
      },
  { timestamps: false },
);

const note = mongoose.model('note', noteSchema);
export default note;
