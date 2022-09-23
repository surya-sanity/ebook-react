import Skeleton from "../../components/skeleton"
import UserCard from "../../components/UserCard"
import { useGetAllUsersQuery } from "../../services/userService"
import { useAppSelector } from "../../store/hooks"
import { getAllUsers } from "../../store/reducers/userReducer"


const AllUsers = () => {
  const { isLoading } = useGetAllUsersQuery()
  const allUsers = useAppSelector(getAllUsers)
  const isAllUsersEmpty = allUsers?.length === 0;

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <>
      <div className="text-4xl font-semibold self-center flex flex-row justify-center items-center mb-5">
        All Users
      </div>
      {isAllUsersEmpty && <div className="max-w-7xl mx-auto ">
        <h1 className="text-3xl w-full flex justify-center items-center">No users here.</h1>
      </div>}
      {!isAllUsersEmpty && <div className="flex flex-row flex-wrap justify-center">
        {allUsers?.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </div>}
    </>
  )
}

export default AllUsers