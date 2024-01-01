import "./NotFound.scss";
import { Link } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useEffect, useState } from "react";
import dark404 from "../../assets/images/dark-404.png";
import illustration404Dark from "../../assets/images/illustration-404-dark.png";
import illustration404Light from "../../assets/images/illustration-404-light.png";
import light404 from "../../assets/images/light-404.png";

function NotFound({ handleTheme, theme }) {
  return (
    <section className="bg-white dark:bg-gray-900 dark:text-gray-400 flex h-screen items-center justify-center px-12 relative text-gray-700">
      <div className="flex flex-col gap-8 items-center lg:flex-row lg:gap-20 lg:justify-between lg:max-w-5xl max-w-sm">
        <img
          className="lg:order-1 lg:w-1/2"
          src={theme === "dark" ? illustration404Dark : illustration404Light}
        />
        <div className="flex flex-col gap-8 items-center lg:items-start lg:w-1/2">
          <img
            className="md:w-5/6 w-36"
            src={theme === "dark" ? dark404 : light404}
          />
          <div className="flex flex-col gap-4 items-center lg:items-start">
            <h1 className="font-bold lg:text-3xl text-2xl">Page Missing!</h1>
            <p className="lg:text-left text-center">
              But no worries! Our ostrich is looking everywhere while you wait
              safely.
            </p>
          </div>
          <Link
            className="bg-blue-600 font-bold rounded px-6 py-3 text-white"
            to="/"
          >
            Go Home
          </Link>
        </div>
        <button
          className="absolute bg-blue-600 bottom-5 md:bottom-8 md:p-3 md:right-8 md:text-2xl p-2 right-5 rounded-full text-white text-xl"
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
