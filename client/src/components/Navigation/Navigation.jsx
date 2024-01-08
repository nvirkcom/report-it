import "./Navigation.scss";
import { AiFillDashboard } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { FaListUl } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { IoIosCreate } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useState } from "react";

function Navigation({ handleTheme, setAuthenticated, theme }) {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displayUserActions, setDisplayUserActions] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800">
      <nav className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-5">
            <button
              className="text-2xl text-gray-500 md:hidden dark:text-gray-400"
              onClick={() => setDisplayMenu(!displayMenu)}
            >
              <IoMdMenu />
            </button>
            <Link to="/">
              <GiNotebook className="text-4xl text-blue-600 dark:text-blue-400" />
            </Link>
          </div>
          <ul className="hidden gap-12 text-sm text-gray-600 md:flex dark:text-gray-400">
            <li className="flex items-center gap-2">
              <IoIosCreate />
              <Link to="/dashboard/reports/create">Create Report</Link>
            </li>
            <li className="flex items-center gap-2">
              <AiFillDashboard />
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaListUl />
              <Link to="/dashboard/reports">Reports</Link>
            </li>
          </ul>
          <div className="flex items-center gap-5">
            <button
              className="rounded-full bg-blue-600 p-2 text-lg text-white hover:bg-blue-700 active:bg-blue-800"
              onClick={handleTheme}
            >
              {theme === "light" && <MdDarkMode />}
              {theme === "dark" && <MdLightMode />}
            </button>
            <div className="relative flex items-center">
              <button
                className="rounded-full bg-gray-500 p-3 text-white dark:bg-white dark:text-gray-600"
                onClick={() => {
                  setDisplayUserActions(!displayUserActions);
                }}
              >
                <FaUser />
              </button>
              {displayUserActions && (
                <div className="absolute right-0 top-12">
                  <ul className="flex w-36 flex-col gap-4 rounded border bg-white p-4 text-sm text-gray-600 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    <li>
                      <button
                        className="flex items-center gap-2"
                        onClick={() => {
                          localStorage.removeItem("token");
                          setAuthenticated(false);
                          navigate("/");
                        }}
                      >
                        <CiLogout /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        {displayMenu && (
          <ul className="flex flex-col gap-4 px-6 pb-5 pt-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-2">
              <IoIosCreate />
              <Link to="/dashboard/reports/create">Create Report</Link>
            </li>
            <li className="flex items-center gap-2">
              <AiFillDashboard />
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaListUl />
              <Link to="/dashboard/reports">Reports</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Navigation;
