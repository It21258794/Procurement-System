import mongoose from 'mongoose';
import order from '../order/order.model'; // Import the Order model
const { Schema } = mongoose;

const noteSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      ref: 'order',
      required: true,
    },
    // address: {
    //   type: String,
    //   required: true,
    // },
    // requiredDate: {
    //   type: Date,
    //   required: true,
    // },
    description: {
      type: String,
      required: true,
    },

  },
  { timestamps: false },
);

const note = mongoose.model('note', noteSchema);
export default note;
