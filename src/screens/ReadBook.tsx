import { useParams, useSearchParams } from "react-router-dom";
import Skeleton from "../components/skeleton";
import { useGetBookByIdQuery } from "../services/booksApi";

const ReadBook = () => {
  const { bookId } = useParams();
  const {
    data: book,
    isLoading,
    isError,
  } = useGetBookByIdQuery(bookId ? bookId : "", { skip: !bookId });

  if (!book || isLoading || isError) {
    return <Skeleton />;
  }

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="text-4xl font-semibold flex flex-row justify-center items-center">
          {book.title}
        </div>
        <div className="text-2xl font-semibold flex flex-row justify-center items-center">
          {book.author}
        </div>
        <div className="text-xl">{book.longDescription}</div>
        <div className="text-xl">{book.longDescription}</div>
        <div className="text-xl">{book.longDescription}</div>
        <div className="text-xl">{book.longDescription}</div>
        <div className="text-xl">{book.longDescription}</div>
        <div className="text-xl">{book.longDescription}</div>
        <div className="text-xl">{book.longDescription}</div>
        <div className="text-xl">{book.longDescription}</div>
      </div>
    </>
  );
};

export default ReadBook;
