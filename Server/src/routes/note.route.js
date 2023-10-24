"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRoute = void 0;
var express_1 = require("express");
var note_controller_1 = require("../controller/note.controller");
exports.noteRoute = (0, express_1.Router)();
// Create a new note
exports.noteRoute.post('/notes', note_controller_1.default.createDeliveryNote);
// Get all notes
exports.noteRoute.get('/allnotes', note_controller_1.default.getAllDeliveryNotes);
exports.default = exports.noteRoute;
