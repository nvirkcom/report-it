import "./App.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Create from "./pages/Create/Create";
import Dashboard from "./pages/Dashboard/Dashboard";
import Edit from "./pages/Edit/Edit";
import Login from "./pages/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import Report from "./pages/Report/Report";
import Reports from "./pages/Reports/Reports";

function App() {
  const [authenticated, setAuthenticated] = useState();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (window.localStorage.getItem("theme")) {
      setTheme(window.localStorage.getItem("theme"));

      if (window.localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
      }
    }

    if (localStorage.getItem("token")) {
      const authenticate = async () => {
        try {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/authenticate`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );

          setAuthenticated(true);
        } catch (error) {
          console.log(error);
        }
      };
      authenticate();
    }
  }, []);

  const handleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    } else {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navigate to="/auth" />} path="/*" />
        <Route
          element={
            <>
              {authenticated && <Navigate to="/dashboard" />}
              {!authenticated && (
                <Routes>
                  <Route element={<Navigate to="/auth/login" />} path="/" />
                  <Route
                    element={
                      <Login
                        handleTheme={handleTheme}
                        setAuthenticated={setAuthenticated}
                        theme={theme}
                      />
                    }
                    path="/login"
                  />
                  <Route
                    element={
                      <Register
                        handleTheme={handleTheme}
                        setAuthenticated={setAuthenticated}
                        theme={theme}
                      />
                    }
                    path="/register"
                  />
                  <Route element={<Navigate to="/404" />} path="*" />
                </Routes>
              )}
            </>
          }
          path="/auth/*"
        />
        <Route
          element={
            <>
              {authenticated === false && <Navigate to="/" />}
              {authenticated && (
                <div className="flex min-h-screen flex-col text-gray-800 dark:text-gray-300">
                  <Navigation
                    handleTheme={handleTheme}
                    setAuthenticated={setAuthenticated}
                    theme={theme}
                  />
                  <div className="grow bg-gray-100 pb-16 dark:bg-gray-900">
                    <div className="mx-auto max-w-6xl px-6">
                      <Routes>
                        <Route element={<Dashboard theme={theme} />} path="/" />
                        <Route element={<Reports />} path="/reports" />
                        <Route element={<Create />} path="/reports/create" />
                        <Route element={<Report />} path="/reports/:id" />
                        <Route element={<Edit />} path="/reports/:id/edit" />
                      </Routes>
                    </div>
                  </div>
                </div>
              )}
            </>
          }
          path="/dashboard/*"
        />
        <Route
          element={<NotFound handleTheme={handleTheme} theme={theme} />}
          path="/404"
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
