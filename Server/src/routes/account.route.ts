import { Router } from 'express';
import accountController from '../controller/account.controller';

export const accountRoute = Router();

accountRoute.post('/createAccount', accountController.signUp);
accountRoute.post('/login', accountController.login);
