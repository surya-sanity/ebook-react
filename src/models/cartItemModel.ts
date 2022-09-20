import { CommonModel } from './commonModel';

export interface CartItemModel extends CommonModel {
  itemId: string
  cartId: string
  noOfDays: number
}