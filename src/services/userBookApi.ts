import { MyBook } from "../models/userBookModel";
import { allApis } from "./allApi";

export const userBookApi = allApis.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    createUserBook: builder.mutation<any, { bookId: string, noOfDays: number }>({
      query: (bookData) => ({
        url: `api/userBook/create`,
        method: 'POST',
        body: bookData
      }),
      invalidatesTags: ['UserBook', 'Wallet', 'Cart', 'Transactions']
    }),
    getMyBooks: builder.query<MyBook[], void>({
      query: () => `api/userBook/getAll`,
      providesTags: ['UserBook']
    }),
    deleteMyBook: builder.mutation<any, { myBookId: string }>({
      query: ({ myBookId }) => {
        return {
          url: `api/userBook/${myBookId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['UserBook']
    }),
  })
});

export const { useCreateUserBookMutation, useGetMyBooksQuery, useDeleteMyBookMutation } = userBookApi;