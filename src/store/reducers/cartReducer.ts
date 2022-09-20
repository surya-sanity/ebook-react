import { CartItemModel } from './../../models/cartItemModel';
import { cartApi } from './../../services/cartApi';
import { CartModel } from './../../models/cartModel';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface CartReducerInitStateType {
  cart: CartModel | undefined;
}

const initialStateValue: CartReducerInitStateType = {
  cart: undefined,
}

interface ChangeNumberOfDaysPayLoadType {
  noOfDays: number,
  itemId: string
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateValue,
  reducers: {
    changeNumberOfDays: (state, action: PayloadAction<ChangeNumberOfDaysPayLoadType>) => {
      if (state.cart && state.cart.items && state.cart.items.length > 0 && action.payload && action.payload.itemId) {
        const exist = state.cart.items.find((cartItem) => cartItem.itemId === action.payload.itemId)

        if (exist) {
          exist.noOfDays = action.payload.noOfDays;
        }
      }
    },
    resetNumberOfDays: (state) => {
      if (state.cart && state.cart.items && state.cart.items.length > 0) {
        state.cart.items.forEach((cartItem) => cartItem.noOfDays = 1)
      }
    },
    resetCartState: () => initialStateValue,
  },
  extraReducers: (builder) => {
    builder.addMatcher(cartApi.endpoints.getCart.matchFulfilled, (state, action) => {
      if (action.payload) {
        state.cart = action.payload;
      }
    });
  }
});

export const getCart = (state: RootState): CartModel => state.cart.cart
export const getCartItems = (state: RootState): CartItemModel[] => state.cart?.cart?.items

export const { resetCartState, changeNumberOfDays, resetNumberOfDays } = cartSlice.actions;
export default cartSlice.reducer;
