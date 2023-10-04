import { Router } from 'express';
import siteController from '../controller/site.controller';
export const siteRoute = Router();
// Route needed
siteRoute.post('/createsite', siteController.insertSite);