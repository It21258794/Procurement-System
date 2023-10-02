import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  supplierid: {
    type:mongoose.Schema.Types.ObjectId,
    require: true,
  },
  procumentStaffid: {
    type:mongoose.Schema.Types.ObjectId,
    require: false,
  },
  amount:{
     type:Number,
     require:true,
  },
});

const Payment= mongoose.model('Payment', PaymentSchema);
export default Payment;
