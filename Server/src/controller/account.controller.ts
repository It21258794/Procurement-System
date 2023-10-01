import { Request, Response } from 'express';
import { IAccount } from '../models/account/IAccount';
import accountmodel from '../models/account/account.model';
import authService from '../utils/auth.service';
import accountService from '../services/account.service';

const signUp = async (req: Request, res: Response) => {
  try {
    const dto = req.body;
    const newAcc = await authService.register(dto);
    res.status(200).json(newAcc);
  } catch (err: any) {
    res.status(400).json({ err: err });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await authService.login(email, password);
    res.status(200).json(response);
  } catch (err: any) {
    res.status(400).json({ err: err });
  }
};

const findItemsByCategory = async (req: Request, res: Response) => {
  try {
    const catogory = req.params.catogory as string;
    const accounts = await accountService.findAccountByCatogory(catogory);
    res.status(200).json(accounts);
  } catch (err: any) {
    res.status(400).json({ err: err.message }); 
  }
};

const findItemsByUserName = async (req: Request, res: Response) => {
  try {
    const username = req.params.username as string;
    const accounts = await accountService.findItemsByUserName(username);
    res.status(200).json(accounts);
  } catch (err: any) {
    res.status(400).json({ err: err.message }); 
  }
};

const updateAccount = async (req: Request, res: Response) => {
  try {
    const accountId = req.params.accountid; 
    const updatedData = req.body;
    
    const updatedAccount = await accountService.updateAccount(accountId, updatedData);
    console.log(updatedAccount);
    res.status(200).json(updatedAccount);
  } catch (err: any) {
    res.status(400).json({ err: err.message });
  }
};


const deleteAccount = async (req: Request, res: Response) => {
  try {
    const accountId = req.params.accountid; 
    const isDeleted = await accountService.deleteAccount(accountId);
    if (isDeleted) {
      res.status(200).json({ message: 'Account deleted successfully' });
    } else {
      res.status(404).json({ message: 'Account is not found' });
    }
  } catch (err: any) {
    res.status(400).json({ err: err.message });
  }
};

export default { signUp, login,findItemsByCategory,findItemsByUserName,updateAccount,deleteAccount};
