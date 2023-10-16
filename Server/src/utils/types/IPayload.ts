export interface IPayload {
  id: string;
  email: string;
  role: string;
}

export enum AuthRole {
  OPEN = 'OPEN',
  PROCUREMENT_MANAGER = 'PROCUREMENT_MANAGER',
  PROCUREMENT_ADMIN = 'PROCUREMENT_ADMIN',
  SITE_MANAGER = 'SITE_MANAGER',
  SUPERVISOR = 'SUPERVISOR',
  SUPPLIER = 'SUPPLIER',
}

export interface JWT_OPTIONS {
  algorithm: string;
  issuer: string;
  audience: string;
  expiresIn: any;
}
