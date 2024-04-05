import React from "react";
import "./../assests/styles/logInPage/loginStyle.css";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/user/thunkAction";
import { useForm } from "react-hook-form";
import Loading from "../component/Loading";
const LoginPage = () => {
  const { user, loadingProccess } = useSelector((state) => state.UserService);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: onchange,
  });
  if (user) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="loginPage h-screen">
      {loadingProccess ? (
        <div className="load-container">
          <Loading />
        </div>
      ) : (
        <div className="login text-center mt-6  rounded-xl xl:w-2/3 lg:w-full md:w-2/3 w-full mx-auto py-5  ">
          <div className="formHeader mb-4">
            <h1 className="md:text-4xl text-3xl mt-3 font-bold">Wellcome!!</h1>
            <h2 className="md:text-2xl text-xl mt-4-">
              Login into your account
            </h2>
          </div>
          <hr className="w-1/2 mx-auto" />
          <form
            className="max-w-sm mx-auto mt-5"
            onSubmit={handleSubmit((value) => {
              dispatch(login(value));
            })}
          >
            <div className="mb-4">
              <label htmlFor="email" className="text-left w-full font-semibold text-lg ">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                {...register("email", {
                  required: "Please enter your email",
                })}
              />
              <p className="text-[13px] text-red-500">
                {errors?.email?.message}
              </p>
            </div>
            <label htmlFor="password" className="text-left w-full font-semibold text-lg ">
                Your Password
              </label>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="password..."
                {...register("password", {
                  required: "Please enter you password",
                })}
              />
              <p className="text-[13px] text-red-500">
                {errors?.passWord?.message}
              </p>
            </div>
            <div className="flex items-start mb-3">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  defaultValue
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <button type="submit" className="submit ">
              LOG IN
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
