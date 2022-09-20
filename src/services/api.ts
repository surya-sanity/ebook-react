import { fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi } from '@reduxjs/toolkit/query/react';
import { Config } from '../config';

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).token.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const baseQueryWithInterceptor: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  return result
}

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
})