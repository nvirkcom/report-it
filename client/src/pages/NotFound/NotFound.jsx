import "./NotFound.scss";
import { Link } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useEffect } from "react";
import dark404 from "../../assets/images/dark-404.png";
import illustration404Dark from "../../assets/images/illustration-404-dark.png";
import illustration404Light from "../../assets/images/illustration-404-light.png";
import light404 from "../../assets/images/light-404.png";

function NotFound({ handleTheme, theme }) {
  useEffect(() => {
    document.title = "404 - Report It";
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-white px-12 text-gray-700 dark:bg-gray-900 dark:text-gray-400">
      <div className="flex max-w-sm flex-col items-center gap-8 lg:max-w-5xl lg:flex-row lg:justify-between lg:gap-20">
        <img
          className="lg:order-1 lg:w-1/2"
          src={theme === "dark" ? illustration404Dark : illustration404Light}
        />
        <div className="flex flex-col items-center gap-8 lg:w-1/2 lg:items-start">
          <img
            className="w-36 md:w-5/6"
            src={theme === "dark" ? dark404 : light404}
          />
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <h1 className="text-2xl font-bold lg:text-3xl">Page Missing!</h1>
            <p className="text-center lg:text-left">
              But no worries! Our ostrich is looking everywhere while you wait
              safely.
            </p>
          </div>
          <Link
            className="rounded bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700 active:bg-blue-800"
            to="/"
          >
            Go Home
          </Link>
        </div>
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

export default NotFound;
