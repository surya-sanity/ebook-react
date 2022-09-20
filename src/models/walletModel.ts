import { CommonModel } from './commonModel';

export enum Mode {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT'
}

export interface WalletModel extends CommonModel {
  userId: string
  walletBalance: number
}

export interface UpdateWalletModel {
  mode: Mode
  amount: number
}