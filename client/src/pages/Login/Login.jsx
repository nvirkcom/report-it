import "./Login.scss";
import { FaKey, FaUser } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import { Link } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function Login({ handleTheme, theme }) {
  const handleLogin = (e) => {
    e.preventDefault();

    const { username, password } = e.target;

    if (!username.value) {
      username.classList.remove("border-gray-400");
      username.classList.remove("dark:border-gray-600");
      username.classList.remove("focus:border-blue-600");
      username.classList.remove("focus:ring-blue-200");
      username.classList.add("border-red-600");
      username.classList.add("dark:border-red-600");
      username.classList.add("focus:border-red-600");
      username.classList.add("focus:ring-red-200");
    } else {
      username.classList.remove("border-red-600");
      username.classList.remove("dark:border-red-600");
      username.classList.remove("focus:border-red-600");
      username.classList.remove("focus:ring-red-200");
      username.classList.add("border-gray-400");
      username.classList.add("dark:border-gray-600");
      username.classList.add("focus:border-blue-600");
      username.classList.add("focus:ring-blue-200");
    }

    if (!password.value) {
      password.classList.remove("border-gray-400");
      password.classList.remove("dark:border-gray-600");
      password.classList.remove("focus:border-blue-600");
      password.classList.remove("focus:ring-blue-200");
      password.classList.add("border-red-600");
      password.classList.add("dark:border-red-600");
      password.classList.add("focus:border-red-600");
      password.classList.add("focus:ring-red-200");
    } else {
      password.classList.remove("border-red-600");
      password.classList.remove("dark:border-red-600");
      password.classList.remove("focus:border-red-600");
      password.classList.remove("focus:ring-red-200");
      password.classList.add("border-gray-400");
      password.classList.add("dark:border-gray-600");
      password.classList.add("focus:border-blue-600");
      password.classList.add("focus:ring-blue-200");
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-7 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
      <div className="flex w-full max-w-lg flex-col items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 lg:px-24 lg:py-12 dark:border-2 dark:border-gray-700 dark:bg-gray-900">
        <GiNotebook className="text-6xl text-blue-600" />
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            Login
          </h1>
          <p className="dark:text-gray-400">Get access to your account</p>
        </div>
        <form
          className="mt-6 flex w-full flex-col gap-5"
          onSubmit={handleLogin}
        >
          <div className="relative flex flex-col gap-1">
            <label
              className="pl-4 text-xs font-bold uppercase"
              htmlFor="username"
            >
              Username
            </label>
            <FaUser className="absolute left-4 top-[31px] text-sm" />
            <input
              autoComplete="off"
              className="rounded border border-gray-400 pb-3 pl-9 pt-2 text-xs outline-none focus:border-blue-600 focus:ring focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-gray-700"
              id="username"
              placeholder="example@email.com"
              type="text"
            />
          </div>
          <div className="relative flex flex-col gap-1">
            <label
              className="pl-4 text-xs font-bold uppercase"
              htmlFor="password"
            >
              Password
            </label>
            <FaKey className="absolute left-4 top-[32px] text-sm" />
            <input
              className="rounded border border-gray-400 pb-3 pl-9 pt-2 text-xs outline-none focus:border-blue-600 focus:ring focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-gray-700"
              id="password"
              placeholder="Password"
              type="password"
            />
          </div>
          <div className="mt-8 flex flex-col items-center gap-3">
            <input
              className="w-full cursor-pointer rounded bg-blue-600 p-2 text-sm font-bold text-white"
              type="submit"
              value="Login"
            />
            <Link
              className="p-1 text-sm font-bold text-blue-500"
              to="/register"
            >
              Register
            </Link>
          </div>
        </form>
        <button
          className="absolute bottom-5 right-5 rounded-full bg-blue-600 p-2 text-xl text-white md:bottom-8 md:right-8 md:p-3 md:text-2xl"
          onClick={handleTheme}
        >
          {theme === "light" && <MdDarkMode />}
          {theme === "dark" && <MdLightMode />}
        </button>
      </div>
    </section>
  );
}

export default Login;
