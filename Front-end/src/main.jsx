// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// // import './index.css'
// // import Dashboard from './Dashboard.jsx'
// // import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Dashboard />
//   </StrictMode>,
// )


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/indexPage.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
