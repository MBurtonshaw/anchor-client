import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { TaskProvider } from "./contexts/TaskContext";
import { GoalProvider } from "./contexts/GoalContext";
import { HomepageProvider } from "./contexts/HomepageContext";
import { ErrorProvider } from "./contexts/ErrorContext";
import "./css/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorProvider>
        <UserProvider>
          <HomepageProvider>
            <TaskProvider>
              <GoalProvider>
                <App />
              </GoalProvider>
            </TaskProvider>
          </HomepageProvider>
        </UserProvider>
      </ErrorProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
