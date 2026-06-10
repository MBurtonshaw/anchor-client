
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
import EditTask from "./components/EditTask";
import EditGoal from "./components/EditGoal";
import AddTask from "./components/AddTask";
import AddGoal from "./components/AddGoal";
import Task from "./components/Task";
import Goal from "./components/Goal";
import Navbar from "./components/ui/Navbar";
import GoalPage from "./components/GoalPage";
import ErrorBanner from "./components/ui/ErrorBanner";
import HowToUse from "./components/HowToUse";
import WeekendTask from "./components/WeekendTask";
import EditWeekendTask from "./components/EditWeekendTask";
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {

  return (

    <div className="App">
      <Navbar />
      <ErrorBanner />

      <Routes>
        {/* public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/how_to_use" element={<HowToUse />} />

        {/* protected */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
        <Route path="/goals" element={<ProtectedRoute><GoalPage /></ProtectedRoute>} />
        <Route path="/weekend/:id" element={<ProtectedRoute><WeekendTask /></ProtectedRoute>} />
                <Route path="/weekend/:id/edit" element={<ProtectedRoute><EditWeekendTask /></ProtectedRoute>} />
        <Route path="tasks/:id"element={<ProtectedRoute><Task /></ProtectedRoute>} />
        <Route path="goals/:id" element={<ProtectedRoute><Goal /></ProtectedRoute>} />
        <Route path="/tasks/add" element={<ProtectedRoute><AddTask /></ProtectedRoute>} />
        <Route path="/goals/add" element={<ProtectedRoute><AddGoal /></ProtectedRoute>} />
        <Route path="/tasks/:id/edit" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />
        <Route path="/goals/:id/edit" element={<ProtectedRoute><EditGoal /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}


export default App;

