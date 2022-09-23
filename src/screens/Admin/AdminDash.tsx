import { FaUsers, FaCartPlus, FaRegBookmark } from "react-icons/fa";
import { AiOutlineBook } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AdminDash = () => {

  const navigate = useNavigate()

  return (
    <div className="flex max-w-7xl mx-auto sm:flex-col md:flex-col justify-center lg:flex-row xl:flex-row gap-5 flex-col">
      <div className="rounded-lg shadow-md bg-white p-10 flex flex-col gap-y-5 items-center justify-center cursor-pointer"
        onClick={() => { navigate("/allUsers") }}
      >
        <FaUsers size={100} />
        Users
      </div>
      <div className="rounded-lg shadow-md bg-white p-10 flex flex-col gap-y-5 items-center justify-center cursor-pointer"
        onClick={() => { navigate("/allBooks") }}
      >
        <AiOutlineBook size={100} />
        Books
      </div>
      <div className="rounded-lg shadow-md bg-white p-10 flex flex-col gap-y-5 items-center justify-center cursor-pointer"
        onClick={() => { navigate("/allCartItems") }}
      >
        <FaCartPlus size={100} />
        Cart Items
      </div>
      <div className="rounded-lg shadow-md bg-white p-10 flex flex-col gap-y-5 items-center justify-center cursor-pointer"
        onClick={() => { navigate("/allUserBooks") }}
      >
        <FaRegBookmark size={100} />
        User Books
      </div>
    </div>
  )
}

export default AdminDash