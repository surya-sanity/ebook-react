import { useEffect } from "react";
import BookCard from "../components/BookCard";
import Skeleton from "../components/skeleton";
import { bookApi, useGetAllBooksQuery } from "../services/booksApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getBooks } from "../store/reducers/bookReducer";

const UserHome = () => {
  useGetAllBooksQuery();

  const books = useAppSelector(getBooks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(bookApi.endpoints.getAllBooks.initiate());
  }, []);

  if (!books) {
    return <Skeleton />;
  }

  return (
    <>
      <div className="flex flex-row flex-wrap">
        {books?.map((book) => (
          <div className="mr-5 mb-5" key={book.id}>
            <BookCard bookId={book.id} />
          </div>
        ))}
      </div>
    </>
  );
};

export default UserHome;
