import "./App.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import Reports from "./pages/Reports/Reports";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (window.localStorage.getItem("theme")) {
      setTheme(window.localStorage.getItem("theme"));

      if (window.localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
      }
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
      <main>
        <Routes>
          <Route element={<Navigate to="/login" />} path="/" />
          <Route
            element={<Login handleTheme={handleTheme} theme={theme} />}
            path="/login"
          />
          <Route
            element={<Register handleTheme={handleTheme} theme={theme} />}
            path="/register"
          />
          <Route
            element={
              <>
                <div className="flex min-h-screen flex-col text-gray-800 dark:text-gray-300">
                  <Navigation handleTheme={handleTheme} theme={theme} />
                  <div className="grow bg-gray-100 pb-16 dark:bg-gray-900">
                    <div className="mx-auto max-w-6xl px-6">
                      <Routes>
                        <Route element={<Dashboard theme={theme} />} path="/" />
                        <Route
                          element={<Reports theme={theme} />}
                          path="/reports"
                        />
                        <Route element={<Navigate to="/404" />} path="*" />
                      </Routes>
                    </div>
                  </div>
                </div>
              </>
            }
            path="/dashboard/*"
          />
          <Route
            element={<NotFound handleTheme={handleTheme} theme={theme} />}
            path="/404"
          />
          <Route element={<Navigate to="/404" />} path="*" />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
