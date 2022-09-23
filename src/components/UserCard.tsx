import { User } from "../models/userModel"
import { useDeleteUserByIdMutation } from "../services/userService";
import { toastError, toastSuccess } from "./Toast";


type Props = {
  user: User
}

const UserCard = (props: Props) => {

  const { user } = props;
  const [deleteUserById] = useDeleteUserByIdMutation()

  const handleDelete = () => {
    deleteUserById({ id: user.id }).unwrap().then((res) => {
      toastSuccess("Delete user success !")
    }).catch((err) => {
      if (err && err.data) {
        toastError(err.data.message)
      } else {
        toastError("Something went wrong !")
      }
    })
  }

  return (
    <div className="w-full max-w-xs bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-3 mr-5 mb-5">
      <div className="flex flex-col gap-y-1 items-center">
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{`${user.firstName} ${user.lastName}`}</h5>
        <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
        <div className="flex space-x-3 mt-2 justify-center">
          <button
            onClick={handleDelete}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default UserCard