import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthRole, IPayload } from './types/IPayload';
import { IAccount } from '../models/account/IAccount';
import accountModel from '../models/account/account.model';

function createPasswordHash(password: string) {
  return bcrypt.hash(password, 10);
}

async function validatePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

async function getToken(password: string, hash: string, payload: IPayload) {
  console.log(payload);
  const isValidPassword = await validatePassword(password, hash);
  if (!isValidPassword) {
    throw new Error('Invalid Password');
  }

  try {
    console.log('kkkk');
    const token = jwt.sign(payload, process.env.APP_SECRET, {
      expiresIn: process.env.APP_ACCESS_TOKEN_EXP_SECS,
    });
    console.log(token);
    return {
      token,
      life: process.env.APP_ACCESS_TOKEN_EXP_SECS,
    };
  } catch (err: any) {
    throw err;
  }
}

async function verifyToken(token: any) {
  try {
    console.log('token', token);
    const payload = await jwt.decode(token);
    console.log(payload);
    return payload;
  } catch (err: any) {
    console.log(err);
  }
}

async function login(email: string, password: string) {
  const acc = await accountModel.findOne({ email: email });

  if (!acc) {
    throw new Error('Account Not Found');
  }
  console.log(email, password);

  const token = await getToken(password, acc.password as string, {
    id: acc._id.toString(),
    email: acc.email as string,
    role: acc.role as string,
  });

  return token;
}

async function register(dto: IAccount): Promise<any> {
  try {
    const existUser = await accountModel.findOne({ email: dto.email });

    console.log(dto);
    if (existUser) {
      throw 'Account already exist for this email address';
    }

    const pass_hash = await createPasswordHash(dto.password);
    console.log(pass_hash);

    let cpyUser = { ...dto };
    cpyUser.password = pass_hash;

    const newUser = await accountModel.create(cpyUser);
    return newUser;
  } catch (err) {
    throw err;
  }
}

export default { createPasswordHash, register, login, verifyToken };
