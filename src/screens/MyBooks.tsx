import { useSelector } from "react-redux";
import BookCard from "../components/BookCard";
import Skeleton from "../components/skeleton";
import { useGetMyBooksQuery } from "../services/userBookApi";
import { getMyBooks } from "../store/reducers/bookReducer";

const MyBooks = () => {
  const myBooks = useSelector(getMyBooks);

  if (!myBooks) {
    return <Skeleton />;
  }

  const isEmpty = myBooks.length === 0;

  return (
    <>
      <div className="text-4xl font-semibold self-center flex flex-row justify-center items-center">
        My Books
      </div>
      {isEmpty && (
        <div className="mt-10 flex flex-row justify-center items-center text-2xl">
          My Books is Empty
        </div>
      )}
      <div className="flex flex-row flex-wrap mt-10">
        {myBooks.map((myBook) => (
          <div key={myBook.id}>
            <BookCard
              bookId={myBook.bookId}
              fromMyBooks={true}
              myBookId={myBook.id}
              endDate={myBook.endDate}
              margin={true}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MyBooks;
