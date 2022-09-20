
import { LoginModel } from "../models/loginModel";
import { User } from "../models/userModel";
import { allApis } from "./allApi";

export const loginApi = allApis.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginModel>({
      query: (loginParam) => ({
        url: `api/users/login`,
        method: 'POST',
        body: loginParam
      })
    })
  })
});

export const { useLoginMutation } = loginApi;