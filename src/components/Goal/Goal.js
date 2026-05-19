import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useGoal } from "../../contexts/GoalContext";
import { useUser } from "../../contexts/UserContext";
import { getGoalById } from "../../service/GoalService";
import "./Goal.css";

function Goal() {
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);

  const { goals, completeGoal, deleteGoal } = useGoal();

  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();

  const createdAtHandler = () => {
    if (!goal?.createdAt) return "";
    return goal.createdAt.slice(0, 10);
  };

  useEffect(() => {
    if (!user?.userId) return;

    const goalId = Number(id);
    const found = goals.find((g) => g.id === goalId);

    if (found) {
      setGoal(found);
      setLoading(false);
      return;
    }

    const fetchGoal = async () => {
      try {
        const data = await getGoalById(goalId);
        setGoal(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [goals, id, user]);

  const handleDelete = async () => {
    navigate("/");
    await deleteGoal(goal.id);
  };

  const handleFinished = async () => {
    await completeGoal(goal.id);
  };

  const handleImage = () => {
    if (!goal.finished) {
      return (
        <div className="finished_image">
          <img className="w-100" src="/blocks.png" alt="unfinished goal" />
        </div>
      );
    } else {
      return (
        <div className="finished_image">
          <img className="w-100" src="/checked.png" alt="completed goal" />
        </div>
      );
    }
  };

  const handleButtons = () => {
    if (!goal.finished) {
      return (
        <div className="todo_buttons_div">
          <Link to={`/goals/${goal.id}/edit`}>
            <button className="todo_button primary">Update</button>
          </Link>

          <button className="todo_button secondary" onClick={handleFinished}>
            Mark Finished
          </button>

          <button className="todo_button danger" onClick={handleDelete}>
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
  if (!goal) return <h2>Goal not found</h2>;

  return (
    <div className="todo_container">
      <div className="card text-center m-auto">
        <div className="card-body">
          <h1 className="card-title">{goal.title}</h1>
          {handleImage()}
          <p className='fs-5'>{goal.notes}</p>
          {handleButtons()}
        </div>
      </div>
    </div>
  );
}

export default Goal;
