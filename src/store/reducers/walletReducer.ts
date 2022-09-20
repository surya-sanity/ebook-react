import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { WalletModel } from '../../models/walletModel';
import { walletApi } from '../../services/walletApi';

interface WalletReducerInitState {
  wallet: WalletModel | undefined;
}

const initialStateValue: WalletReducerInitState = {
  wallet: undefined
}

export const walletSlice = createSlice({
  name: "wallet",
  initialState: initialStateValue,
  reducers: {
    resetWalletState: () => initialStateValue,
  },
  extraReducers: (builder) => {
    builder.addMatcher(walletApi.endpoints.getWallet.matchFulfilled, (state, action) => {
      if (action.payload) {
        state.wallet = action.payload;
      }
    });
  }
});

export const getWallet = (state: RootState): WalletModel => state.wallet.wallet

export const { resetWalletState } = walletSlice.actions;
export default walletSlice.reducer;
