import { Router } from 'express';
import siteController from '../controller/site.controller';
export const siteRoute = Router();

siteRoute.post('/createsite', siteController.insertsite);