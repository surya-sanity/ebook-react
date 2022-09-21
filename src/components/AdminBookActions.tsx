import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDeleteBookByIdMutation } from "../services/booksApi";
import { toastError, toastSuccess } from "./Toast";


interface AdminBookActionPropType {
  bookId: string
}

const AdminBookActions = (props: AdminBookActionPropType) => {
  const { bookId } = props;

  const navigate = useNavigate()

  const [deleteBook] = useDeleteBookByIdMutation()

  if (!bookId) {
    return null;
  }

  const handleEdit = () => {
    navigate(`/book/${bookId}`)
  }

  const handleDelete = async () => {
    await deleteBook({ id: bookId }).unwrap().
      then((result) => {
        toastSuccess("Book Deleted")
      }).catch((err) => {
        if (err && err.data) {
          toastError(err.data.message)
        } else {
          toastError("Something Went wrong !")
        }
      })
  }

  return (
    <div className="flex flex-row justify-evenly p-2 w-full">
      <div
        onClick={handleEdit}
        className="rounded-full p-1 hover:bg-gray-200 cursor-pointer hover:scale-125 transition-all"> <AiFillEdit size={25} /></div>
      <div
        onClick={() => { handleDelete() }}
        className="rounded-full p-1 hover:bg-gray-200 cursor-pointer hover:scale-125 transition-all"> <AiFillDelete color={"#F87171"} size={25} /></div>
    </div>
  )
}

export default AdminBookActions;