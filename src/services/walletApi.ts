import { UpdateWalletModel, WalletModel } from './../models/walletModel';
import { allApis } from "./allApi";

export const walletApi = allApis.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getWallet: builder.query<WalletModel, void>({
      query: () => `api/wallet/current`,
      providesTags: (_) => ['Wallet']
    }),
    updateWalletBalance: builder.mutation<WalletModel, { walletUpdate: UpdateWalletModel }>({
      query: ({ walletUpdate }) => {
        return {
          url: `api/wallet/update`,
          method: 'PUT',
          body: walletUpdate,
        };
      },
      invalidatesTags: (_) => ['Wallet', 'Transactions']
    }),
  })
});

export const { useGetWalletQuery, useUpdateWalletBalanceMutation } = walletApi;