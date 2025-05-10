import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Siginup";
import Layout from "./components/Layout";
import MyList from "./pages/MyList";
import PrivateRoute from "./utils/PrivateRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="my-list" element={<MyList />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
