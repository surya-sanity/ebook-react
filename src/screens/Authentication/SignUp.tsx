import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CTA from "../../components/CTA";
import Field from "../../components/Field";
import { SignUpModel } from "../../models/signupModel";
import { useSignUpMutation } from "../../services/signupService";

const initialSignUpFormData: SignUpModel = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signupFormData, setSignUpFormData] = useState<SignUpModel>(
    initialSignUpFormData
  );
  const [signUpMutation] = useSignUpMutation();

  const handleChange = (event: any) => {
    setSignUpFormData({
      ...signupFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignUp = (event: any) => {
    event.preventDefault();
    signUpMutation(signupFormData)
      .unwrap()
      .then((user) => {
        setSignUpFormData(initialSignUpFormData);
        navigate("/home");
      });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center ">SignUp</h1>
        <form className="mt-6">
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              First Name
            </label>
            <Field
              type="text"
              name="firstName"
              value={signupFormData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Last Name
            </label>
            <Field
              type="text"
              name="lastName"
              value={signupFormData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <Field
              type="email"
              name="email"
              value={signupFormData.email}
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
              value={signupFormData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mt-6">
            <CTA onClick={handleSignUp}>Sign Up</CTA>
          </div>
        </form>

        <div
          className="mt-8 text-xs font-light text-center text-gray-700"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          Already have an account?
          <div className="font-medium text-purple-600 hover:underline mt-2">
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
