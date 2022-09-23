import { bookApi } from './../../services/booksApi';
import { createSlice } from "@reduxjs/toolkit";
import { BookModel } from "../../models/bookModel";
import { RootState } from "../../store";
import { MyBook } from '../../models/userBookModel';
import { userBookApi } from '../../services/userBookApi';

interface BookReducerInitStateType {
  books: BookModel[]
  myBooks: MyBook[]
  adminAllUserBooks: MyBook[]
}

const initialStateValue: BookReducerInitStateType = {
  books: [],
  myBooks: [],
  adminAllUserBooks: []
}

export const bookSlice = createSlice({
  name: "book",
  initialState: initialStateValue,
  reducers: {
    resetBookState: () => initialStateValue,
  },
  extraReducers: (builder) => {
    builder.addMatcher(bookApi.endpoints.getAllBooks.matchFulfilled, (state, action) => {
      if (action.payload) {
        state.books = action.payload;
      }
    });
    builder.addMatcher(bookApi.endpoints.getBooksByTitle.matchFulfilled, (state, action) => {
      if (action.payload && Array.isArray(action.payload)) {
        state.books = action.payload;
      }
    });
    builder.addMatcher(userBookApi.endpoints.getMyBooks.matchFulfilled, (state, action) => {
      if (action.payload) {
        state.myBooks = action.payload;
      }
    });
    builder.addMatcher(userBookApi.endpoints.getAllUsersBooksAdmin.matchFulfilled, (state, action) => {
      if (action.payload) {
        state.adminAllUserBooks = action.payload;
      }
    });
  }
});

export const getBooks = (state: RootState): BookModel[] => state.book.books;
export const getMyBooks = (state: RootState): MyBook[] => state.book.myBooks;
export const getAllUsersBookAdmin = (state: RootState): MyBook[] => state.book.adminAllUserBooks;

export const { resetBookState } = bookSlice.actions;
export default bookSlice.reducer;
