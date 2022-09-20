import { TransactionModel } from "../models/transactionModel";
import { allApis } from "./allApi";

export const transactionsApi = allApis.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({

    getAllTransactions: builder.query<TransactionModel[], void>({
      query: () => `api/transactions/current`,
      providesTags: ['Transactions']
    }),

  })
});

export const { useGetAllTransactionsQuery } = transactionsApi;