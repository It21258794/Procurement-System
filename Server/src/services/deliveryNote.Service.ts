import { INote } from '../models/deliveryNotice/INote';
import noteModel from '../models/deliveryNotice/note.model';
import orderModel from '../models/order/order.model';

const createNote = async (noteDetails: INote) => {
  try {
    // const order = await orderModel.findOne({ orderId: noteDetails.orderId });
    // if (!order) {
    //   throw new Error('Order not found');
    // }
    const newNote = await noteModel.create(noteDetails);
    return newNote;
  } catch (err) {
    throw err;
  }
};

async function getAllNotes() {
  try {
    const notes = await noteModel.find();
    return notes;
  } catch (error) {
    throw error;
  }
}

export default { getAllNotes, createNote };
