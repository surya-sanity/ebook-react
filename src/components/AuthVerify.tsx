import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { getToken } from "../store/reducers/tokenReducer";
import { getCurrentUser } from "../store/reducers/userReducer";
import { toastError } from "./Toast";
import jwt_decode from "jwt-decode";
import { useSignOutHook } from "../hooks/signOutHook";

const AuthVerify = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const token = useAppSelector(getToken);

  const { signOut } = useSignOutHook();

  //checking for token expiration
  useEffect(() => {
    let interval: NodeJS.Timer;
    checkTokenExpiration();

    interval = setInterval(() => {
      checkTokenExpiration();
    }, 60000);

    if (!token || !currentUser) {
      signOut();
    }

    return () => {
      clearInterval(interval);
    };
  }, [currentUser, token]);

  function checkTokenExpiration() {
    if (token && currentUser) {
      const decodedJwt: any = jwt_decode(token);

      if (decodedJwt.exp && Date.now() >= decodedJwt.exp * 1000) {
        toastError("Session Expired");
        signOut();
      }
    }
  }

  return <></>;
};

export default AuthVerify;
