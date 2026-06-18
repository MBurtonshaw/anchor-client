import { Link, useParams, useNavigate } from "react-router-dom";
import { useGoal } from "../../contexts/GoalContext";
import { useHomepage } from "../../contexts/HomepageContext";
import Loader from "../ui/Loader";
import { useState } from "react";
import { toast } from "react-toastify";

function Goal() {
  const { goals, completeGoal, deleteGoal, loading } = useGoal();

  const { id } = useParams();
  const { getHomepage } = useHomepage();
  const navigate = useNavigate();
      const goalId = Number(id);
    const goal = goals.find((g) => g.id === goalId);
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
  "You've got this"
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
    await deleteGoal(goal.id);
    toast.success("Successfully removed");
    getHomepage();
    } finally {
      setSavingId(null);
    }
    navigate("/");
  };

  const handleFinished = async () => {
    setSavingId(1);
    try {
      await completeGoal(goal.id);
      toast.success(determineToast(encouragements));
      getHomepage();
    } finally {
      setSavingId(null);
    }

  };

  const handleImage = () => {
    if (!goal.finished) {
      return (
        <div className="finished_image pt-5 pb-2">
          <img className="w-100" src="/blocks.png" alt="unfinished goal" />
        </div>
      );
    } else {
      return (
        <div className="finished_image pt-5 pb-5">
          <img className="w-100" src="/checked.png" alt="completed goal" />
        </div>
      );
    }
  };

  const handleButtons = () => {
    if (!goal.finished) {
      return (
        <div className="todo_buttons_div m-auto mt-5">
          <button
            className="primary_button w-100"
            onClick={() => navigate(`/goals/${goal.id}/edit`)}
          >
            Update
          </button>

          <button className="secondary_button w-100" onClick={handleFinished} disabled={savingId === 1}>
            {savingId === 1 ? "..." : "Complete"}
          </button>

          <button className="danger_button w-100" onClick={handleDelete} disabled={savingId === 1}>
            {savingId === 1 ? "..." : "Delete"}
          </button>

          <button
            className="tertiary_button w-100"
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </div>
      );
    } else {
      return (
        <div className="todo_buttons_div">
          <Link to={`/`}>
            <button className="primary_button w-100">Home</button>
          </Link>
        </div>
      );
    }
  };

  if (loading && !goals) {
    return <Loader />;
  }
  if (!goal) return <h2>Goal not found</h2>;

  const formattedDueDate = new Date(
    goal.dueDate + "T00:00:00",
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="component_container">
      <div className="card text-center m-auto">
        <div className="card-body p-4">
          <h1 className="card-title">{goal.title}</h1>
          {handleImage()}
          {goal.notes && <p className="fs-5">{goal.notes}</p>}
          {goal.dueDate && <p className="text-muted">Due {formattedDueDate}</p>}
          {handleButtons()}
        </div>
      </div>
    </div>
  );
}

export default Goal;
