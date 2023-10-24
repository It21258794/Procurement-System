import { NextFunction, Request, Response } from 'express';

import authService from './auth.service';
import { IPayload } from './types/IPayload';

//type decalration for request
declare module 'express-serve-static-core' {
  interface Request {
    currentUser: any;
  }
}

const AuthGuard = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers['authorization']; // getb the tokwn from req

  if (!authToken) {
    return res.status(400).send({
      err: 'Forbinded Resources1',
    });
  }

  try {
    console.log(authToken.split('Bearer ')[1]);
    const payload = await authService.verifyToken(
      // verify the token and get the payload
      authToken.split('Bearer ')[1],
    );
    req.currentUser = payload; //assign the payload to the req
    next();
  } catch (err) {
    return res.status(400).send({
      err: 'Forbinded Resources2',
    });
  }
};

export default AuthGuard;
