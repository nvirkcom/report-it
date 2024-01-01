import "./App.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navigate to="/login" />} path="/" />
        <Route element={<div>Login</div>} path="/login" />
        <Route element={<div>404</div>} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
