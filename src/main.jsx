// import { StrictMode } from 'react';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { UserContextProvider } from "./context/userContext.jsx";
import { CourseContextProvider } from "./context/CourseContext.jsx";
export const server = "https://e-learn-backend-sbet.onrender.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
        <App />
      </CourseContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
