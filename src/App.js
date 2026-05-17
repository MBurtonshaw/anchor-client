import { Routes, Route } from "react-router-dom";
import "./normalize.css";
import "./App.css";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import EditTask from "./components/EditTask/EditTask";
import EditGoal from "./components/EditGoal/EditGoal";
import AddTask from "./components/AddTask/AddTask";
import AddGoal from "./components/AddGoal/AddGoal";
import Task from "./components/Task/Task";
import Goal from "./components/Goal/Goal";
import Navbar from "./components/Navbar/Navbar";
import ErrorBanner from "./components/ErrorBanner/ErrorBanner";

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
        <Route path="tasks/:id" element={<Task />} />
        <Route path="goals/:id" element={<Goal />} />
        <Route path="/tasks/add" element={<AddTask />} />
        <Route path="/goals/add" element={<AddGoal />} />
        <Route path="/tasks/:id/edit" element={<EditTask/>} />
        <Route path="/goals/:id/edit" element={<EditGoal/>} />
      </Routes>
    </div>
  );
}

export default App;
