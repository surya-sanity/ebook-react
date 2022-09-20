import { getToken, resetToken } from '../store/reducers/tokenReducer';
import { getCurrentUser, resetUserReducer } from '../store/reducers/userReducer';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';

export const useSignOutHook = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const currentUser = useAppSelector(getCurrentUser)
  const token = useAppSelector(getToken);

  const signOut = () => {
    dispatch(resetToken())
    dispatch(resetUserReducer())
    dispatch({ type: 'USER_LOGOUT' })
    navigate('/')
  }

  return { currentUser, token, signOut };
}