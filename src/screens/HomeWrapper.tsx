import { useEffect } from "react";
import NavBar from "../components/NavBar";
import { Role } from "../models/userModel";
import { useAppSelector } from "../store/hooks";
import { getCurrentUser } from "../store/reducers/userReducer";
import AdminHome from "./AdminHome";
import UserHome from "./UserHome";

const HomeWrapper = () => {
  const currentUser = useAppSelector(getCurrentUser);

  return (
    <>
      <div className="">
        {currentUser.role === Role.Admin ? <AdminHome /> : <UserHome />}
      </div>
    </>
  );
};

export default HomeWrapper;
