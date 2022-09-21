import BookCard from "../components/BookCard";
import Skeleton from "../components/skeleton";
import { useGetAllBooksQuery } from "../services/booksApi";
import { useAppSelector } from "../store/hooks";
import { getBooks } from "../store/reducers/bookReducer";

const AdminHome = () => {
  useGetAllBooksQuery();
  const books = useAppSelector(getBooks);

  if (!books) {
    return <Skeleton />;
  }

  return (
    <>
      <div className="flex flex-row flex-wrap">
        {books?.map((book) => (
          <div className="mr-5 mb-5" key={book.id}>
            <BookCard bookId={book.id} isAdmin={true} />
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminHome;
