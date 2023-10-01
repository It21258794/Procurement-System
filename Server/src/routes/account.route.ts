import { Router } from 'express';
import accountController from '../controller/account.controller';

export const accountRoute = Router();

accountRoute.post('/createAccount', accountController.signUp);
accountRoute.post('/login', accountController.login);
accountRoute.get('/findAccountByCategory/:catogory',accountController.findItemsByCategory);
accountRoute.get('/findAccountByUserName/:username',accountController.findItemsByUserName);
accountRoute.put('/updateAccount/:accountid',accountController.updateAccount);
accountRoute.delete('/deleteAccount/:accountid',accountController.deleteAccount);
