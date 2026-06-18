import { Link, useNavigate } from "react-router-dom";
import { useWeekendTask } from "../../contexts/WeekendTaskContext";
import { useHomepage } from "../../contexts/HomepageContext";
import Loader from "../ui/Loader";
import { useState } from "react";
import { toast } from "react-toastify";

function WeekendTask() {
  const { weekendTask, completeWeekendTask, loading } = useWeekendTask();
  const [lastToast, setLastToast] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const navigate = useNavigate();
  const { getHomepage } = useHomepage();

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

  const handleFinished = async () => {
    setSavingId(1);
    try {
    await completeWeekendTask(weekendTask.id);
    toast.success(determineToast(encouragements));
    getHomepage();
    } finally {
      setSavingId(null);
    }
    navigate(`/weekend/${weekendTask.id}`);
  };

  const completedToday = () => {
    if (!weekendTask?.lastCompleted) return false;

    const today = new Date().toISOString().slice(0, 10);

    return weekendTask.lastCompleted === today;
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
          <Link to={`/weekend/${weekendTask.id}/edit`}>
            <button className="primary_button w-100">Update</button>
          </Link>

          <button
            className="secondary_button w-100"
            onClick={handleFinished}
            disabled={savingId === 1}
          >
            {savingId === 1 ? "..." : "Complete"}
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

  if (loading && !weekendTask) {
    return <Loader />;
  }
  if (!weekendTask) return <h2>Task not found</h2>;

  return (
    <div className="component_container">
      <div className="card text-center m-auto">
        <div className="card-body p-4">
          <h1 className="card-title">{weekendTask.title}</h1>

          {handleImage()}

          {handleButtons()}
        </div>
      </div>
    </div>
  );
}

export default WeekendTask;
