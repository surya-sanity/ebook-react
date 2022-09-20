import { CartItemModel } from './cartItemModel';
import { CommonModel } from './commonModel';

export interface CartModel extends CommonModel {
  id: string
  userId: number
  items: CartItemModel[]
}