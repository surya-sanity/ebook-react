import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CTA from "../../components/CTA";
import Field from "../../components/Field";
import { LoginModel } from "../../models/loginModel";
import { useLoginMutation } from "../../services/loginService";
import { useAppSelector } from "../../store/hooks";
import { getToken } from "../../store/reducers/tokenReducer";
import { getCurrentUser } from "../../store/reducers/userReducer";

const initialLoginFormData: LoginModel = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] =
    useState<LoginModel>(initialLoginFormData);
  const [loginMutation] = useLoginMutation();

  const currentUser = useAppSelector(getCurrentUser);
  const token = useAppSelector(getToken);

  useEffect(() => {
    if (currentUser && token) {
      navigate("/home");
    }
  }, [currentUser, token]);

  const handleChange = (event: any) => {
    setLoginFormData({
      ...loginFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = (event: any) => {
    event.preventDefault();
    loginMutation(loginFormData)
      .unwrap()
      .then((user) => {
        setLoginFormData(initialLoginFormData);
        navigate("/home");
      });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center">Login</h1>
        <form className="mt-6">
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <Field
              type="email"
              name="email"
              value={loginFormData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <Field
              type="password"
              name="password"
              value={loginFormData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6">
            <CTA onClick={handleLogin}>Login</CTA>
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
