import { Request, Response } from 'express';
import noteService from '../services/deliveryNote.Service';

const createDeliveryNote = async (req: Request, res: Response) => {
  try {
    const noteDetails = req.body;
    console.log(noteDetails)
    const createdDeliveryNote = await noteService.createNote(noteDetails);
    res.status(201).json(createdDeliveryNote);
  } catch (err: any) {
    res.status(400).json({ err: err });
  }
};

const getAllDeliveryNotes = async (req: Request, res: Response) => {
  try {
    const deliveryNotes = await noteService.getAllNotes();

    if (deliveryNotes && deliveryNotes.length > 0) {
      res.status(200).json({ deliveryNotes });
    } else {
      res.status(404).json({ message: 'No delivery notes found' });
    }
  } catch (err: any) {
    res.status(500).json({ err: err.message });
  }
};

export default { createDeliveryNote, getAllDeliveryNotes };
