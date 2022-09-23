import BookCard from "../../components/BookCard";
import Skeleton from "../../components/skeleton";
import { useGetAllBooksQuery } from "../../services/booksApi";
import { useAppSelector } from "../../store/hooks";
import { getBooks } from "../../store/reducers/bookReducer";

const AdminAllBooks = () => {
  useGetAllBooksQuery();
  const books = useAppSelector(getBooks);
  const isBooksEmpty = books.length === 0;

  if (!books) {
    return <Skeleton />;
  }

  return (
    <>
      {isBooksEmpty && <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl w-full flex justify-center items-center">No books for now</h1>
      </div>}
      {!isBooksEmpty && <div className="flex flex-row flex-wrap">
        {books?.map((book) => (
          <div key={book.id}>
            <BookCard bookId={book.id} isAdmin={true} margin={true} />
          </div>
        ))}
      </div>}
    </>
  );
};

export default AdminAllBooks;
