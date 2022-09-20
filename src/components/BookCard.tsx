import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCheckExpiryHook from "../hooks/checkExpiryHook";
import { useGetBookByIdQuery } from "../services/booksApi";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from "../services/cartApi";
import { useDeleteMyBookMutation } from "../services/userBookApi";
import { useAppSelector } from "../store/hooks";
import { getMyBooks } from "../store/reducers/bookReducer";
import { getCart } from "../store/reducers/cartReducer";
import CTA from "./CTA";
import Skeleton from "./skeleton";
import { toastError, toastSuccess } from "./Toast";

interface BookCardPropType {
  bookId: string;
  fromMyBooks?: boolean;
  myBookId?: string;
  endDate?: string;
}

const BookCard = (prop: BookCardPropType) => {
  const { bookId, fromMyBooks, myBookId, endDate } = prop;
  const { data: book, isLoading, isError } = useGetBookByIdQuery(bookId);
  const { findExpirationString, isExpired } = useCheckExpiryHook();

  const [bookExpired, setBookExpired] = useState<boolean>(false);
  const [expireString, setExpireString] = useState<string>("");

  useEffect(() => {
    let interval: NodeJS.Timer;

    const findExpirations = () => {
      if (fromMyBooks && myBookId && endDate) {
        setBookExpired(isExpired(new Date(endDate)));
        setExpireString(findExpirationString(new Date(endDate)));
      }
    };

    if (fromMyBooks && myBookId && endDate) {
      findExpirations();
      interval = setInterval(() => {
        findExpirations();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [fromMyBooks, myBookId, endDate]);

  if (isLoading || isError || !book) {
    return <Skeleton />;
  }

  if (bookExpired) {
    return null;
  }

  return (
    <div className={`flex flex-wrap `}>
      <div className="c-card block relative bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden h-[30rem] w-[13rem] ">
        {expireString && (
          <div className="absolute top-[20.5rem] right-2 z-10 bg-pink-100 text-pink-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-pink-200 dark:text-pink-900 flex flex-row justify-end">
            {expireString}
          </div>
        )}
        <div className="relative pb-48 overflow-hidden">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={book.thumbnailUrl}
            alt="image"
          />
        </div>
        <div className="p-4 ">
          <span className=" py-1 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs leading-5 line-clamp-1">
            {book?.genre}
          </span>
          <div className="h-10">
            <h2 className="mt-2 mb-2 font-bold line-clamp-2">{book.title}</h2>
          </div>
          <p className="text-sm"></p>
          <div className="mt-3 flex items-center">
            <span className="font-bold text-xl">$ {book.pricePerDay}</span>
            &nbsp;
            <span className="text-sm font-semibold">/ day</span>
          </div>
        </div>
        <div className="py-4 border-t border-b text-xs text-gray-700">
          <span className="flex mb-2">
            <i className="far fa-address-card fa-fw text-gray-900 mr-2 "></i>
            {book.author}
          </span>
          <span className="flex  mb-1">
            <i className="far fa-clock fa-fw mr-2 text-gray-900"></i>
            {book?.pageCount} pages
          </span>
        </div>
        <div className="flex flex-row justify-between">
          {!myBookId && !fromMyBooks && (
            <>
              <div className="px-2 py-4 flex items-center text-sm text-gray-600">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 fill-current text-yellow-500"
                >
                  <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 fill-current text-yellow-500"
                >
                  <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 fill-current text-yellow-500"
                >
                  <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 fill-current text-yellow-500"
                >
                  <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 fill-current text-gray-400"
                >
                  <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                </svg>
              </div>
            </>
          )}
          <div className="p-2 w-full flex flex-1">
            {
              <CardActions
                bookId={bookId}
                myBookId={myBookId ? myBookId : undefined}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

const CardActions = ({
  bookId,
  myBookId,
}: {
  bookId: string;
  myBookId?: string;
}) => {
  const cart = useAppSelector(getCart);
  const myBooks = useAppSelector(getMyBooks);

  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const [alreadyInMyBooks, setAlreadyInMyBooks] = useState(false);

  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [deleteMyBook] = useDeleteMyBookMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (cart && cart.items) {
      if (cart.items.find((cartItem) => cartItem.itemId === bookId)) {
        setAlreadyInCart(true);
      } else {
        setAlreadyInCart(false);
      }
    }
  }, [cart]);

  useEffect(() => {
    if (myBooks && myBooks.length) {
      if (myBooks.find((myBook) => myBook.bookId === bookId)) {
        setAlreadyInMyBooks(true);
      } else {
        setAlreadyInMyBooks(false);
      }
    }
  }, [myBooks]);

  const handleAddToCart = async () => {
    if (bookId) {
      await addToCart({ itemId: bookId })
        .unwrap()
        .then((cart) => {
          toastSuccess("Added to Cart !");
        })
        .catch((err) => {
          toastError("Sorry,Please try again");
          console.error("Add to Cart err -->", err);
        });
    }
  };

  const handleRemoveFromCart = async () => {
    if (bookId) {
      await removeFromCart({ itemId: bookId })
        .unwrap()
        .then((cart) => {
          toastSuccess("Removed from Cart !");
        })
        .catch((err) => {
          toastError("Sorry,Please try again");
          console.error("Remove Cart err -->", err);
        });
    }
  };

  const handleDeleteMyBook = async () => {
    if (myBookId) {
      await deleteMyBook({ myBookId })
        .unwrap()
        .then((_) => {
          toastSuccess("Book deleted successfully");
        })
        .catch((err) => {
          toastError("Sorry,Please try again");
        });
    }
  };

  if (alreadyInCart) {
    return (
      <CTA className="py-0" onClick={handleRemoveFromCart}>
        Remove
      </CTA>
    );
  }

  if (alreadyInMyBooks && myBookId) {
    return (
      <div className="flex flex-row justify-between w-full ">
        <CTA
          className="py-0 bg-green-500 hover:bg-green-500 focus:outline-none focus:bg-green-400 w-auto"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            navigate(`/read/${bookId}`);
          }}
        >
          Read
        </CTA>
        <CTA
          className="py-0 bg-red-500 hover:bg-red-500 focus:outline-none focus:bg-red-400 w-auto"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleDeleteMyBook();
          }}
        >
          Delete
        </CTA>
      </div>
    );
  }

  if (alreadyInMyBooks) {
    return (
      <CTA
        className="py-0 bg-green-500 hover:bg-green-500 focus:outline-none focus:bg-green-400"
        onClick={() => {
          navigate(`/read/${bookId}`);
        }}
      >
        Read
      </CTA>
    );
  }

  return (
    <CTA className="py-0" onClick={handleAddToCart}>
      Add
    </CTA>
  );
};
