import { Routes, Route } from "react-router-dom";
import "./normalize.css";
import "./App.css";
import "./buttons.css";
import "./containers.css";
import "./navigation.css";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import EditTask from "./components/EditTask";
import EditGoal from "./components/EditGoal";
import AddTask from "./components/AddTask";
import AddGoal from "./components/AddGoal";
import Task from "./components/Task";
import Goal from "./components/Goal";
import Navbar from "./components/Navbar";
import GoalPage from "./components/GoalPage";
import ErrorBanner from "./components/ErrorBanner";
import HowToUse from "./components/HowToUse";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ErrorBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/goals" element={<GoalPage />} />
        <Route path="tasks/:id" element={<Task />} />
        <Route path="goals/:id" element={<Goal />} />
        <Route path="/tasks/add" element={<AddTask />} />
        <Route path="/goals/add" element={<AddGoal />} />
        <Route path="/tasks/:id/edit" element={<EditTask/>} />
        <Route path="/goals/:id/edit" element={<EditGoal/>} />
        <Route path="/how_to_use" element={<HowToUse/>} />
      </Routes>
    </div>
  );
}

export default App;
