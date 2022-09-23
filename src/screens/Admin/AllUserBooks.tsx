import AdminUserBookCard from "../../components/AdminUserBookCard";
import Skeleton from "../../components/skeleton";
import { useGetAllUsersBooksAdminQuery } from "../../services/userBookApi";
import { useAppSelector } from "../../store/hooks";
import { getAllUsersBookAdmin } from "../../store/reducers/bookReducer";

const AllUserBooks = () => {
  const { isLoading } = useGetAllUsersBooksAdminQuery()
  const usersBooks = useAppSelector(getAllUsersBookAdmin)
  const isUsersBooksEmpty = usersBooks?.length === 0;

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <>
      <div className="text-4xl font-semibold self-center flex flex-row justify-center items-center mb-5">
        All Users books
      </div>
      {isUsersBooksEmpty && <div className="max-w-7xl mx-auto ">
        <h1 className="text-3xl w-full flex justify-center items-center">No users have rented books now.</h1>
      </div>}
      {!isUsersBooksEmpty && <div className="flex flex-row flex-wrap justify-center">
        {usersBooks?.map((usersBook) => (
          <AdminUserBookCard userBook={usersBook} key={usersBook.id} />
        ))}
      </div>}
    </>
  )
}

export default AllUserBooks