import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PaymentItemSchema = new Schema(
  {
    order_id: {
      type: String,
      require: true,
    },
    accountNumber: {
      type: String,
      require: true,
    },
    accountHolderName: {
      type: String,
      require: true,
    },
    bankName: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true },
);

const PaymentItem = mongoose.model('PaymentItem', PaymentItemSchema);
export default PaymentItem;
