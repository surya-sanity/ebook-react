import { BookModel } from "../models/bookModel";
import { allApis } from "./allApi";

export const bookApi = allApis.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    createBook: builder.mutation<BookModel, BookModel>({
      query: (bookData) => ({
        url: `api/books/addBook`,
        method: 'POST',
        body: bookData
      }),
      invalidatesTags: ['Book']
    }),
    getAllBooks: builder.query<BookModel[], void>({
      query: () => `api/books/allBooks`,
      providesTags: ['Book']
    }),
    getBookById: builder.query<BookModel, string>({
      query: (id) => `api/books/id/${id}`,
      providesTags: ['Book']
    }),
    getBooksByTitle: builder.mutation<BookModel[], { term: string }>({
      query: ({ term }) => ({
        url: `api/books/filter`,
        method: 'POST',
        body: { term }
      }),
    }),
    updateBookById: builder.mutation<BookModel, { id: string, book: Partial<BookModel> }>({
      query: ({ book, id }) => {
        return {
          url: `api/books/${id}`,
          method: 'PUT',
          body: book,
        };
      },
      invalidatesTags: ['Book']
    }),
    deleteBookById: builder.mutation<any, { id: string }>({
      query: ({ id }) => {
        return {
          url: `api/books/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Book']
    }),
  })
});

export const { useCreateBookMutation, useGetAllBooksQuery, useGetBookByIdQuery, useDeleteBookByIdMutation, useGetBooksByTitleMutation, useUpdateBookByIdMutation } = bookApi;