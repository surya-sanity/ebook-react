import { useEffect } from "react";
import BookCard from "../components/BookCard";
import Skeleton from "../components/skeleton";
import { bookApi, useGetAllBooksQuery } from "../services/booksApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getBooks } from "../store/reducers/bookReducer";

const UserHome = () => {
  const { isLoading } = useGetAllBooksQuery();

  const books = useAppSelector(getBooks);
  const dispatch = useAppDispatch();

  const isBooksEmpty = books.length === 0;

  useEffect(() => {
    dispatch(bookApi.endpoints.getAllBooks.initiate());
  }, []);

  if (!books || isLoading) {
    return <Skeleton />;
  }

  return (
    <>
      {isBooksEmpty && <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl w-full flex justify-center items-center">No books here !</h1>
      </div>}
      {!isBooksEmpty && <div className="flex flex-row flex-wrap">
        {books?.map((book) => (
          <div key={book.id}>
            <BookCard bookId={book.id}
              margin={true} />
          </div>
        ))}
      </div>}
    </>
  );
};

export default UserHome;
