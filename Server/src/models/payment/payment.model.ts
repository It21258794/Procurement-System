import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  accountNumber: {
    type: Number,
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
},{timestamps:true});

const Payment = mongoose.model('Payment', PaymentSchema);
export default Payment;
