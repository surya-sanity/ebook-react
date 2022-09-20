import { PayloadAction } from './../../../node_modules/@reduxjs/toolkit/src/createAction';
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/userModel";
import { RootState } from '../../store';
import { loginApi } from '../../services/loginService';
import { signUpApi } from '../../services/signupService';
import { userApi } from '../../services/userService';

interface UserState {
  currentUser: User | undefined
}

const initialStateValue: UserState = {
  currentUser: undefined
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialStateValue,
  reducers: {
    updateCurrentUser: (state, action: PayloadAction<User>) => {
      if (action.payload) {
        state.currentUser = action.payload
      }
    },
    resetUserReducer: (state) => initialStateValue
  },
  extraReducers: (builder) => {
    builder.addMatcher(loginApi.endpoints.login.matchFulfilled, (state, action) => {
      if (action.payload) {
        state.currentUser = action.payload;
      }
    });
    builder.addMatcher(signUpApi.endpoints.signUp.matchFulfilled, (state, action) => {
      if (action.payload) {
        state.currentUser = action.payload;
      }
    });
    builder.addMatcher(userApi.endpoints.getCurrentUser.matchFulfilled, (state, action) => {
      if (action.payload) {
        state.currentUser = action.payload;
      }
    });
  }
});

export const getCurrentUser = (state: RootState): User => state.user.currentUser;
export const { updateCurrentUser, resetUserReducer } = userSlice.actions;

export default userSlice.reducer;
