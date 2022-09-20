import { createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../../services/loginService";
import { signUpApi } from "../../services/signupService";
import { RootState } from "../../store";

interface TokenReducerInitStateType {
  token: string | undefined
}

const initialStateValue: TokenReducerInitStateType = {
  token: undefined
}

export const tokenSlice = createSlice({
  name: "token",
  initialState: initialStateValue,
  reducers: {
    changeToken: (state, action) => {
      if (action.payload)
        state.token = action.payload;
    },
    resetToken: () => initialStateValue,
  },
  extraReducers: (builder) => {
    builder.addMatcher(loginApi.endpoints.login.matchFulfilled, (state, action) => {
      if (action.payload) {
        state.token = action.payload.token;
      }
    });
    builder.addMatcher(signUpApi.endpoints.signUp.matchFulfilled, (state, action) => {
      if (action.payload) {
        state.token = action.payload.token;
      }
    });
  }
});

export const getToken = (state: RootState): string => state.token.token

export const { changeToken, resetToken } = tokenSlice.actions;
export default tokenSlice.reducer;
