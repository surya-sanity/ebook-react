import { CommonModel } from './commonModel';
import { Mode } from './walletModel';

export interface TransactionModel extends CommonModel {
  id: string
  userId: string
  mode: Mode
  amount: number
}