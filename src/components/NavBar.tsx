import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSignOutHook } from "../hooks/signOutHook";
import { useGetCartQuery } from "../services/cartApi";
import { useDeleteAllUsersBooksAdminMutation, useGetMyBooksQuery } from "../services/userBookApi";
import { useGetWalletQuery } from "../services/walletApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { resetNumberOfDays } from "../store/reducers/cartReducer";
import LOGO from "../Assets/logo.png";
import SearchBar from "./SearchBar";
import { getAllUsers, getCurrentUser } from "../store/reducers/userReducer";
import { Role } from "../models/userModel";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { getAllUsersBookAdmin, getBooks } from "../store/reducers/bookReducer";
import { useCreateBulkBooksMutation, useDeleteAllBooksMutation } from "../services/booksApi";
import { toastError, toastSuccess } from "./Toast";
import { booksJson } from '../Assets/books'
import { useDeleteAllUsersMutation } from "../services/userService";

export default function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const { signOut } = useSignOutHook();
  const { data: wallet } = useGetWalletQuery();
  const { data: cart } = useGetCartQuery();
  useGetMyBooksQuery();

  const currentUser = useAppSelector(getCurrentUser)

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const books = useAppSelector(getBooks);
  const allUsers = useAppSelector(getAllUsers);
  const allUsersBooksAdmin = useAppSelector(getAllUsersBookAdmin);

  const [createManyBooks] = useCreateBulkBooksMutation()
  const [deleteAllBooks] = useDeleteAllBooksMutation()
  const [deleteAllUsers] = useDeleteAllUsersMutation()
  const [deleteAllUserBooksAdmin] = useDeleteAllUsersBooksAdminMutation()

  const showSearchBar = (pathname === "/home" && currentUser.role === Role.User) || (pathname === "/allBooks" && currentUser.role === Role.Admin);

  const handleBulkBooksCreate = () => {
    const booksToCreate = booksJson
    createManyBooks(booksToCreate).unwrap().then((result) => {
      toastSuccess("Books created successfully !")
    }).catch((err) => {
      if (err && err.data) {
        toastError(err.data.message)
      } else {
        toastError("Something went wrong !")
      }
    })
  }

  const handleBulkBooksDelete = () => {
    deleteAllBooks().unwrap().then((result) => {
      toastSuccess("Deleted all books !")
    }).catch((err) => {
      if (err && err.data) {
        toastError(err.data.message)
      } else {
        toastError("Something went wrong !")
      }
    })
  }

  const handleDeleteAllUsers = () => {
    deleteAllUsers().unwrap().then((result) => {
      toastSuccess("Deleted all Users !")
    }).catch((err) => {
      if (err && err.data) {
        toastError(err.data.message)
      } else {
        toastError("Something went wrong !")
      }
    })
  }

  const handleDeleteAllUsersBooksAdmin = () => {
    deleteAllUserBooksAdmin().unwrap().then((result) => {
      toastSuccess("Deleted all users books !")
    }).catch((err) => {
      if (err && err.data) {
        toastError(err.data.message)
      } else {
        toastError("Something went wrong !")
      }
    })
  }

  return (
    <>
      <section>
        <nav className="w-full bg-white shadow ">
          <div className="justify-between px-10 md:items-center md:flex md:px-8">
            <div className="w-auto">
              <div className="flex items-center justify-between py-3 md:py-5 md:block">
                <span
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={() => navigate("/home")}
                >
                  <div className="flex flex-row items-center justify-evenly">
                    <div className="h-12 w-12 mr-3">
                      <img src={LOGO} alt="Ebooks" className="object-fill" />
                    </div>
                    <span className="text-2xl font-bold">EBOOKS</span>
                    {currentUser.role === Role.Admin && <div className="pl-3 text-sm font-bold">ADMIN</div>}
                  </div>
                </span>
                <div className="md:hidden">
                  <button
                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            {showSearchBar ? (
              <div className="w-[30rem]">
                <SearchBar />
              </div>
            ) : null}
            <div>
              <div
                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                  }`}
              >
                <ul className="items-center justify-center space-y-8 md:flex md:space-x-12 md:space-y-0">

                  {currentUser.role === Role.User && <li
                    className="text-gray-600 hover:text-blue-600 cursor-pointer"
                    onClick={() => {
                      navigate("/myBooks");
                    }}
                  >
                    <span className="block py-2 pr-4 pl-5 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      My Books
                    </span>
                  </li>}
                  {currentUser.role === Role.User && <li
                    className="text-gray-600 hover:text-blue-600 cursor-pointer flex flex-row"
                    onClick={() => {
                      dispatch(resetNumberOfDays());
                      navigate("/cart");
                    }}
                  >
                    <span className="relative block py-2 pr-4 pl-5 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Cart
                    </span>
                    {
                      <div className={`${cart?.items?.length ? "flex" : "hidden"}  ml-1 bg-purple-700 rounded-full p-1  justify-center items-center text-white text-xs mx-auto w-auto px-2`}>
                        {cart?.items?.length}
                      </div>
                    }
                  </li>}
                  {currentUser.role === Role.User && <li
                    className="text-white  flex flex-row bg-purple-700 px-2 py-1 rounded-lg cursor-pointer"
                    onClick={() => {
                      navigate("/wallet");
                    }}
                  >
                    <span className="block py-2 pr-4 pl-5  rounded md:border-0 md:p-0 ">
                      Wallet ${wallet?.walletBalance}
                    </span>
                  </li>}
                  {currentUser.role === Role.Admin && pathname === "/allBooks" && <li
                    className="text-white  flex flex-row bg-purple-700 px-2 py-1 rounded-lg cursor-pointer items-center justify-evenly"
                    onClick={() => {
                      navigate("/book");
                    }}
                  >
                    <FaPlus color="white" />
                    <span className="ml-2 block py-2 pr-4 pl-5  rounded md:border-0 md:p-0 ">
                      Add Book
                    </span>
                  </li>}
                  {currentUser.role === Role.Admin && books.length === 0 && pathname === "/allBooks" && <li
                    className="text-white  flex flex-row bg-purple-700 px-2 py-1 rounded-lg cursor-pointer items-center justify-evenly"
                    onClick={() => {
                      handleBulkBooksCreate()
                    }}
                  >
                    <FaPlus color="white" />
                    <span className="ml-2 block py-2 pr-4 pl-5  rounded md:border-0 md:p-0 ">
                      Bulk books
                    </span>
                  </li>}
                  {currentUser.role === Role.Admin && books.length !== 0 && pathname === "/allBooks" && <li
                    className="text-white  flex flex-row bg-red-700 px-2 py-1 rounded-lg cursor-pointer items-center justify-evenly"
                    onClick={() => {
                      handleBulkBooksDelete()
                    }}
                  >
                    <AiOutlineDelete color="white" />
                    <span className="ml-2 block py-2 pr-4 pl-5  rounded md:border-0 md:p-0 ">
                      Delete all books
                    </span>
                  </li>}
                  {currentUser.role === Role.Admin && allUsers?.length !== 0 && pathname === "/allUsers" && <li
                    className="text-white  flex flex-row bg-red-700 px-2 py-1 rounded-lg cursor-pointer items-center justify-evenly"
                    onClick={() => {
                      handleDeleteAllUsers()
                    }}
                  >
                    <AiOutlineDelete color="white" />
                    <span className="ml-2 block py-2 pr-4 pl-5  rounded md:border-0 md:p-0 ">
                      All Users
                    </span>
                  </li>}
                  {currentUser.role === Role.Admin && allUsersBooksAdmin?.length !== 0 && pathname === "/allUserBooks" && <li
                    className="text-white  flex flex-row bg-red-700 px-2 py-1 rounded-lg cursor-pointer items-center justify-evenly"
                    onClick={() => {
                      handleDeleteAllUsersBooksAdmin()
                    }}
                  >
                    <AiOutlineDelete color="white" />
                    <span className="ml-2 block py-2 pr-4 pl-5  rounded md:border-0 md:p-0 ">
                      All UsersBooks
                    </span>
                  </li>}
                  <li
                    className="text-gray-600 hover:text-blue-600 cursor-pointer flex flex-row items-center justify-evenly"
                    onClick={signOut}
                  >
                    <span className="mr-2 block py-2 pr-4 pl-5 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Logout
                    </span>
                    <FaSignOutAlt color="black" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </section>
      <section className=" px-10 pt-5 overflow-x-clip">
        <Outlet />
      </section>
    </>
  );
}
