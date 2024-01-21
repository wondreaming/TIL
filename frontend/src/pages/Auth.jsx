import { Route, Routes } from "react-router-dom";

import Login from "../components/AuthComponent/Login";
import Signup from "../components/AuthComponent/Signup";
import CreateNickname from "../components/AuthComponent/CreateNickname";

const Auth = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/nickname" element={<CreateNickname />}></Route>
    </Routes>
  );
};

export default Auth;
