
import { Routes, Route } from "react-router-dom";
import "./css/normalize.css";
import "./css/App.css";
import "./css/buttons.css";
import "./css/containers.css";
import "./css/navigation.css";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import EditTask from "./components/task/EditTask";
import EditGoal from "./components/goal/EditGoal";
import AddTask from "./components/task/AddTask";
import AddGoal from "./components/goal/AddGoal";
import Task from "./components/task/Task";
import Goal from "./components/goal/Goal";
import Navbar from "./components/ui/Navbar";
import GoalHub from "./components/goal/GoalHub";
import Accomplishments from "./components/goal/Accomplishments";
import TaskManager from "./components/task/TaskManager";
import GoalManager from "./components/goal/GoalManager";
import ErrorBanner from "./components/ui/ErrorBanner";
import HowToUse from "./components/HowToUse";
import WeekendTask from "./components/weekendTask/WeekendTask";
import EditWeekendTask from "./components/weekendTask/EditWeekendTask";
import ProtectedRoute from './components/utils/ProtectedRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (

    <div className="App">
      <Navbar />
      <ErrorBanner />
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />

      <Routes>
        {/* public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/how_to_use" element={<HowToUse />} />

        {/* protected */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><TaskManager /></ProtectedRoute>} />
        <Route path="/goals" element={<ProtectedRoute><GoalHub /></ProtectedRoute>} />
        <Route path="/weekend/:id" element={<ProtectedRoute><WeekendTask /></ProtectedRoute>} />
        <Route path="/weekend/:id/edit" element={<ProtectedRoute><EditWeekendTask /></ProtectedRoute>} />
        <Route path="tasks/:id"element={<ProtectedRoute><Task /></ProtectedRoute>} />
        <Route path="goals/:id" element={<ProtectedRoute><Goal /></ProtectedRoute>} />
        <Route path="/tasks/add" element={<ProtectedRoute><AddTask /></ProtectedRoute>} />
        <Route path="/goals/manage" element={<ProtectedRoute><GoalManager /></ProtectedRoute>} />
        <Route path="/goals/add" element={<ProtectedRoute><AddGoal /></ProtectedRoute>} />
        <Route path="/goals/accomplishments" element={<ProtectedRoute><Accomplishments /></ProtectedRoute>} />
        <Route path="/tasks/:id/edit" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />
        <Route path="/goals/:id/edit" element={<ProtectedRoute><EditGoal /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}


export default App;

