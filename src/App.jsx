import Home from "./pages/home/Home";
import "./app.scss";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Watch from "./pages/watch/Watch";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home type="" /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/movies"
          element={!user ? <Navigate to="/login" /> : <Home type="movie" />}
        ></Route>
        <Route
          path="/series"
          element={!user ? <Navigate to="/login" /> : <Home type="series" />}
        ></Route>
        <Route
          path="/watch"
          element={!user ? <Navigate to="/login" /> : <Watch />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
