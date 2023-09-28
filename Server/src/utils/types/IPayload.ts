export interface IPayload {
  id: string;
  email: string;
  role: string;
}

export enum AuthRole {
  OPEN = 'OPEN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}
