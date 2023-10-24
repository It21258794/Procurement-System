import { Router } from 'express';
import accountController from '../controller/account.controller';
import AuthGuard from '../utils/authGuard';
import { body } from 'express-validator';
import validate from '../utils/validator';

export const accountRoute = Router();

accountRoute.post('/createAccount',validate([
  body('fname').exists().isString(),
  body('lname').exists().isString(),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Enter an Valid Email '),
  body('password')
    .isString()
    .isLength({ min: 8 })
    .withMessage('Password needs have atleast 8 characters '),
]), accountController.signUp);

accountRoute.post('/login',validate([
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Enter an Valid Email '),
  body('password')
    .isString()
    .isLength({ min: 8 })
    .withMessage('Password needs have atleast 8 characters '),
]),  accountController.login);

accountRoute.get(
  '/findAccountByCategory/:catogory',
  accountController.findItemsByCategory,
);
accountRoute.get(
  '/findAccountByUserName/:username',
  accountController.findItemsByUserName,
);
accountRoute.get('/currentUser', AuthGuard, accountController.getCurrentUser);
accountRoute.put('/updateAccount/:accountid', accountController.updateAccount);
accountRoute.delete(
  '/deleteAccount/:accountid',
  accountController.deleteAccount,
);
accountRoute.get('/supplierEmail/:supplierId', accountController.getSupllierEmail);
accountRoute.get('/getAccountTypes', accountController.getAccountTypes);
