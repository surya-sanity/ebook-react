import { SignUpModel } from './../models/signupModel';
import { User } from "../models/userModel";
import { allApis } from "./allApi";

export const signUpApi = allApis.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    signUp: builder.mutation<User, SignUpModel>({
      query: (signUpData) => ({
        url: `api/users/register`,
        method: 'POST',
        body: signUpData
      })
    })
  })
});

export const { useSignUpMutation } = signUpApi;