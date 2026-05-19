import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTask } from "../../contexts/TaskContext";
import { useUser } from "../../contexts/UserContext";
import { getTaskById } from "../../service/TaskService";
import "./Task.css";

function Task() {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const { tasks, completeTask, deleteTask } = useTask();

  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.userId) return;

    const taskId = Number(id);
    const found = tasks.find((t) => t.id === taskId);

    if (found) {
      setTask(found);
      setLoading(false);
      return;
    }

    const fetchTask = async () => {
      try {
        const data = await getTaskById(taskId);
        setTask(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [tasks, id, user]);

  const handleDelete = async () => {
    await deleteTask(task.id);
    navigate("/");
  };

  const handleFinished = async () => {
    await completeTask(task.id);
  };

const completedToday = () => {
  if (!task?.lastCompleted) return false;

  const today = new Date().toISOString().slice(0, 10);

  return task.lastCompleted === today;
};

  const handleImage = () => {
  if (!completedToday()) {
    return (
      <div className="finished_image">
        <img
          className="w-100"
          src="/blocks.png"
          alt="unfinished task"
        />
      </div>
    );
  } else {
    return (
      <div className="finished_image">
        <img
          className="w-100"
          src="/checked.png"
          alt="completed task"
        />
      </div>
    );
  }
};

const handleButtons = () => {
  if (!completedToday()) {
    return (
      <div className="todo_buttons_div">
        <Link to={`/tasks/${task.id}/edit`}>
          <button className="todo_button primary">Update</button>
        </Link>

        <button
          className="todo_button secondary"
          onClick={handleFinished}
        >
          Complete Task
        </button>

        <button
          className="todo_button danger"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    );
  } else {
    return (
      <div className="todo_buttons_div">
        <Link to={`/`}>
          <button className="todo_button primary">Home</button>
        </Link>
      </div>
    );
  }
};

  if (loading) return <h2>Loading...</h2>;
  if (!task) return <h2>Task not found</h2>;

return (
  <div className="todo_container">
    <div className="card text-center m-auto">
      <div className="card-body p-4">
        <h1 className="card-title">
          {task.title}
        </h1>

        {handleImage()}

        <div className="pt-4">
          {handleButtons()}
        </div>
      </div>
    </div>
  </div>
);
}

export default Task;
