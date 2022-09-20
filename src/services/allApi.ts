import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithInterceptor } from './api';

export const allApis = createApi({
  reducerPath: "allApi",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['CurrentUser', 'Book', 'Wallet', 'Cart', 'UserBook', 'Transactions'],
  endpoints: (builder) => ({})
});