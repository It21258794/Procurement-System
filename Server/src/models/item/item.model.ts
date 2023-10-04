import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  itemName: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: false,
  },
  img: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  supplierId:{
    type:mongoose.Schema.Types.ObjectId,
    require:true
  },
  price: {
    type: Number,
    require: true,
  },
});

const Item = mongoose.model('Item', ItemSchema);
export default Item;
