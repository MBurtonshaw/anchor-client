import { Link, useParams, useNavigate } from "react-router-dom";
import { useGoal } from "../../contexts/GoalContext";
import Loader from "../ui/Loader";

function Goal() {
  const { goals, completeGoal, deleteGoal, loading } = useGoal();

  const { id } = useParams();
  const navigate = useNavigate();
      const goalId = Number(id);
    const goal = goals.find((g) => g.id === goalId);


  const handleDelete = async () => {
    await deleteGoal(goal.id);
    navigate("/");
  };

  const handleFinished = async () => {
    await completeGoal(goal.id);
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

          <button className="secondary_button w-100" onClick={handleFinished}>
            Complete
          </button>

          <button className="danger_button w-100" onClick={handleDelete}>
            Delete
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
