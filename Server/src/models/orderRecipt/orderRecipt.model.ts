import mongoose from 'mongoose';


const OrderRceiptSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    supplierId: {
      type: String,
      required: true,
    },
    paid_amount: {
      type: Number,
      required: true,
    },
    paid_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const OrderRceipt = mongoose.model('order', OrderRceiptSchema);
export default OrderRceipt;
