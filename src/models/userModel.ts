import { CommonModel } from './commonModel';

export enum Role {
  Admin = 'admin',
  User = 'user'
}

export interface User extends CommonModel {
  id: string
  firstName: string
  lastName: string
  email: string
  token?: string
  role?: Role
}