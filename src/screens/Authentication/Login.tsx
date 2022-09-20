import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CTA from "../../components/CTA";
import ErrorText from "../../components/ErrorText";
import Field from "../../components/Field";
import { toastError } from "../../components/Toast";
import { LoginModel } from "../../models/loginModel";
import { useLoginMutation } from "../../services/loginService";
import { useAppSelector } from "../../store/hooks";
import { getToken } from "../../store/reducers/tokenReducer";
import { getCurrentUser } from "../../store/reducers/userReducer";
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from '../../utils/validation'
import LogoHeader from "../../components/LogoHeader";


const Login = () => {
  const navigate = useNavigate();
  const [loginMutation] = useLoginMutation();
  const { register, reset, handleSubmit, formState: { errors }, watch } = useForm<LoginModel>({ mode: 'onChange', resolver: yupResolver(loginValidationSchema) })

  const [loginError, setLoginError] = useState("")

  const currentUser = useAppSelector(getCurrentUser);
  const token = useAppSelector(getToken);

  useEffect(() => {
    if (watch('email') || watch("password")) {
      setLoginError("")
    }
  }, [watch('email'), watch("password")])

  useEffect(() => {
    if (currentUser && token) {
      navigate("/home");
    }
  }, [currentUser, token]);

  const handleLogin = (values: LoginModel) => {

    loginMutation(values)
      .unwrap()
      .then((user) => {
        reset();
        navigate("/home");
      }).catch((err) => {
        if (err && err.data) {
          setLoginError(err.data.message)
        } else {
          toastError("Something went wrong !")
        }
      });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <LogoHeader />
        <h1 className="text-3xl font-semibold text-center">Login</h1>
        <form className="mt-6" onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <Field
              {...register("email")}
              type="email"
            />
            <ErrorText err={errors.email?.message} />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-800">
              Password
            </label>

            <Field
              {...register('password')}
              type="password"
            />
            <ErrorText err={loginError || errors.password?.message} />
          </div>

          <div className="mt-6">
            <CTA type="submit">Login</CTA>
          </div>
        </form>

        <div
          className="mt-8 text-xs font-light text-center text-gray-700"
          onClick={(e) => {
            e.preventDefault();
            navigate("/signUp");
          }}
        >
          Don't have an account?
          <div className="font-medium text-purple-600 hover:underline mt-2">
            Signup
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

function isValidEmail(email: string) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}