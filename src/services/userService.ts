import { User } from "../models/userModel";
import { allApis } from "./allApi";

export const userApi = allApis.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      query: () => `api/users/current`,
      providesTags: ['CurrentUser']
    }),
  })
});

export const { useGetCurrentUserQuery } = userApi;