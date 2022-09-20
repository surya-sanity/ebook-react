import { CartModel } from '../models/cartModel';
import { allApis } from "./allApi";

export const cartApi = allApis.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getCart: builder.query<CartModel, void>({
      query: () => `api/cart/getCart`,
      providesTags: (_) => ['Cart']
    }),
    addToCart: builder.mutation<CartModel, { itemId: string }>({
      query: ({ itemId }) => {
        return {
          url: `api/cart/${itemId}`,
          method: 'PUT',
        };
      },
      invalidatesTags: (_) => ['Cart']
    }),
    removeFromCart: builder.mutation<string, { itemId: string }>({
      query: ({ itemId }) => {
        return {
          url: `api/cart/${itemId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_) => ['Cart']

    }),
    clearCart: builder.mutation<any, void>({
      query: () => {
        return {
          url: `api/cart/clear`,
          method: 'POST',
        };
      },
      invalidatesTags: (_) => ['Cart']
    }),
  })
});

export const { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation, useClearCartMutation } = cartApi;