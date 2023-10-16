import { Router } from 'express';
import noteController from '../controller/note.controller';

export const noteRoute = Router();

// Create a new note
noteRoute.post('/notes', noteController.createDeliveryNote);

// Get all notes
noteRoute.get('/allnotes', noteController.getAllDeliveryNotes);

export default noteRoute;

