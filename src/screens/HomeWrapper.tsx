import { Role } from "../models/userModel";
import { useAppSelector } from "../store/hooks";
import { getCurrentUser } from "../store/reducers/userReducer";
import AdminDash from "./Admin/AdminDash";
import UserHome from "./UserHome";

const HomeWrapper = () => {
  const currentUser = useAppSelector(getCurrentUser);

  return (
    <>
      <div >
        {currentUser.role === Role.Admin ? <AdminDash /> : <UserHome />}
      </div>
    </>
  );
};

export default HomeWrapper;
