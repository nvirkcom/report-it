import "./App.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "./pages/NotFound/NotFound";

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
          <Route element={<div>Login</div>} path="/login" />
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
