import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Edit from "./components/Edit/Edit";
import Add from "./components/Add/Add";
import Todo from "./components/Todo/Todo";
import Navbar from "./components/Navbar/Navbar";
import ErrorBanner from "./components/ErrorBanner/ErrorBanner";
import Greeting from "./components/Greeting/Greeting";

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
        <Route path="/:id" element={<Todo />} />
        <Route path="/todos/add" element={<Add />} />
        <Route path="/todos/:id/edit" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
