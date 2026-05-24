import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useGoal } from "../contexts/GoalContext";
import { useUser } from "../contexts/UserContext";
import { getGoalById } from "../service/GoalService";

function Goal() {
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);

  const { goals, completeGoal, deleteGoal } = useGoal();

  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();

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
        <div className="todo_buttons_div row w-50 m-auto mt-5">
            <button className="primary_button" onClick={() => navigate(`/goals/${goal.id}/edit`)}>Update</button>

          <button className="secondary_button" onClick={handleFinished}>
            Complete
          </button>

          <button className="danger_button" onClick={handleDelete}>
            Delete
          </button>

          <button className="tertiary_button" onClick={() => navigate('/')}>
            Home
          </button>
        </div>
      );
    } else {
      return (
        <div className="todo_buttons_div">
          <Link to={`/`}>
            <button className="primary_button primary">Home</button>
          </Link>
        </div>
      );
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (!goal) return <h2>Goal not found</h2>;

  return (
    <div className="component_container">
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
