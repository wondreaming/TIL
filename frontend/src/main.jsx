import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import reportWebVitals from "./utils/reportWebVitals.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// 성능 측정을 위한 함수
reportWebVitals();
