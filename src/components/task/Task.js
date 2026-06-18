import { Link, useParams, useNavigate } from "react-router-dom";
import { useTask } from "../../contexts/TaskContext";
import Loader from "../ui/Loader";
import { useState } from "react";
import { toast } from "react-toastify";

function Task() {
  const { tasks, completeTask, deleteTask, loading } = useTask();

  const { id } = useParams();
  const navigate = useNavigate();
  const taskId = Number(id);
  const task = tasks.find((t) => t.id === taskId);
  const [lastToast, setLastToast] = useState(null);
  const [savingId, setSavingId] = useState(null);

  const encouragements = [
    "Nice work",
    "Well done",
    "Great job",
    "Keep it up",
    "One step at a time",
    "Progress made",
    "You did it",
    "Mission complete",
    "That's a win",
    "Momentum matters",
    "Another step forward",
    "Good effort",
    "Keep moving",
    "You're making progress",
    "Way to go",
    "Nicely done",
    "Small steps add up",
    "That's progress",
    "Keep building momentum",
    "You showed up today",
    "Every move counts",
    "Forward is forward",
    "Keep going",
    "Another one down",
    "You've got this",
  ];

  const determineToast = (list) => {
    if (!list?.length) return "Good job";

    let next = null;

    do {
      next = list[Math.floor(Math.random() * list.length)];
    } while (next === lastToast && list.length > 1);

    setLastToast(next);
    return next;
  };

  const handleDelete = async () => {
    setSavingId(1);
    try {
      await deleteTask(task.id);
      toast.success("Successfully removed");
    } finally {
      setSavingId(null);
    }
    navigate("/");
  };

  const handleFinished = async () => {
    setSavingId(1);
    try {
      await completeTask(task.id);
      toast.success(determineToast(encouragements));
    } finally {
      setSavingId(null);
    }
  };

  const completedToday = () => {
    if (!task?.lastCompleted) return false;

    const today = new Date().toISOString().slice(0, 10);

    return task.lastCompleted === today;
  };

  const handleImage = () => {
    if (!completedToday()) {
      return (
        <div className="finished_image pt-5 pb-2">
          <img className="w-100" src="/blocks.png" alt="unfinished task" />
        </div>
      );
    } else {
      return (
        <div className="finished_image pt-5 pb-5">
          <img className="w-100" src="/checked.png" alt="completed task" />
        </div>
      );
    }
  };

  const handleButtons = () => {
    if (!completedToday()) {
      return (
        <div className="todo_buttons_div m-auto mt-5">
          <Link to={`/tasks/${task.id}/edit`}>
            <button className="primary_button w-100">Update</button>
          </Link>

          <button
            className="secondary_button w-100"
            onClick={handleFinished}
            disabled={savingId === 1}
          >
            {savingId === 1 ? "..." : "Complete"}
          </button>

          <button
            className="danger_button w-100"
            onClick={handleDelete}
            disabled={savingId === 1}
          >
            {savingId === 1 ? "..." : "Delete"}
          </button>
          <Link to="/">
            <button className="tertiary_button w-100">Home</button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="todo_buttons_div">
          <Link to={`/`}>
            <button className="primary_button">Home</button>
          </Link>
        </div>
      );
    }
  };

  if (loading && !tasks) {
    return <Loader />;
  }
  if (!task) return <h2>Task not found</h2>;

  return (
    <div className="component_container">
      <div className="card text-center m-auto">
        <div className="card-body p-4">
          <h1 className="card-title">{task.title}</h1>

          {handleImage()}

          {handleButtons()}
        </div>
      </div>
    </div>
  );
}

export default Task;
