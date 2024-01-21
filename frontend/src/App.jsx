import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Lobby from "./pages/Lobby";
import WaitingRoom from "./pages/WaitingRoom";
import Game from "./pages/Game";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/waitingRoom" element={<WaitingRoom />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<div>없는 페이지야!</div>} />
      </Routes>
    </Router>
  );
};

export default App;
