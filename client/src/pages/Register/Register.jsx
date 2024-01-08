import "./Register.scss";
import { GiNotebook } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import FormErrors from "../../components/FormErrors/FormErrors";

function Register({ handleTheme, setAuthenticated, theme }) {
  const [formErrors, setFormErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register - Report It";
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    const { username, password } = e.target;

    let errors = [];

    if (!username.value) {
      errors.push({ id: 1, text: "Username is required" });
    }

    if (!password.value) {
      errors.push({ id: 2, text: "Password is required" });
    }

    setFormErrors(errors);

    if (errors.length === 0) {
      if (errors.length === 0) {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/register`,
            { password: password.value, username: username.value },
          );
          localStorage.setItem("token", data.token);
          setAuthenticated(true);
          navigate("/dashboard");
        } catch (error) {
          if (error.response.status === 404) {
            setFormErrors([{ id: 1, text: error.response.data.message }]);
          }
        }
      }
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-7 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 lg:max-w-lg lg:px-24 lg:py-12 dark:border-2 dark:border-gray-700 dark:bg-gray-900">
        <GiNotebook className="text-6xl text-blue-600" />
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            Register
          </h1>
          <p className="dark:text-gray-400">Create your account today</p>
        </div>
        <form
          className="mt-6 flex w-full flex-col gap-5"
          onSubmit={handleRegister}
        >
          <div className="relative flex flex-col gap-1">
            <label
              className="pl-4 text-[10px] font-bold uppercase"
              htmlFor="username"
            >
              Username
            </label>
            <input
              autoComplete="off"
              className="rounded border border-gray-400 pb-3 pl-4 pt-2 text-xs outline-none focus:border-blue-600 focus:ring focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-blue-950"
              id="username"
              placeholder="example@email.com"
              type="text"
            />
          </div>
          <div className="relative flex flex-col gap-1">
            <label
              className="pl-4 text-[10px] font-bold uppercase"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="rounded border border-gray-400 pb-3 pl-4 pt-2 text-xs outline-none focus:border-blue-600 focus:ring focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-blue-950"
              id="password"
              placeholder="Password"
              type="password"
            />
          </div>
          {formErrors.length > 0 && <FormErrors formErrors={formErrors} />}
          <div className="mt-8 flex flex-col items-center gap-3">
            <input
              className="w-full cursor-pointer rounded bg-blue-600 p-2 text-sm font-bold text-white hover:bg-blue-700 active:bg-blue-800"
              type="submit"
              value="Register"
            />
            <Link
              className="p-1 text-sm font-bold text-blue-500 hover:text-blue-600 active:text-blue-700"
              to="/auth/login"
            >
              Login to an existing account
            </Link>
          </div>
        </form>
        <button
          className="absolute bottom-5 right-5 rounded-full bg-blue-600 p-2 text-xl text-white hover:bg-blue-700 active:bg-blue-800 md:bottom-8 md:right-8 md:p-3 md:text-2xl"
          onClick={handleTheme}
        >
          {theme === "light" && <MdDarkMode />}
          {theme === "dark" && <MdLightMode />}
        </button>
      </div>
    </section>
  );
}

export default Register;
