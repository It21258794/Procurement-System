import { Request, Response } from 'express';
import { NextFunction } from 'express';
import { AuthRole } from './types/IPayload';

const HasRole = (roles: AuthRole) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.currentUser.role;

    if (roles.includes(userRole)) {
      next();
    } else {
      return res.status(401).json('Do not have permission');
    }
  };
};
