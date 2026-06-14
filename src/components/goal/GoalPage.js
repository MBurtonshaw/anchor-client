import { Link, useNavigate } from "react-router-dom";
import { useGoal } from "../../contexts/GoalContext";
import Loader from "../ui/Loader";

function GoalPage() {
  const { goals, loading } = useGoal();
  const navigate = useNavigate();

  function goalMapper(goal) {
    return goal.finished ? "card-body card--finished" : "card-body unfinished";
  }

  function viewMapper() {
    // unfinished first, finished last
    const sortedGoals = [...goals].sort(
      (a, b) => Number(a.finished) - Number(b.finished),
    );

    return sortedGoals.map((goal) => (
      <div className="single_todo col-12 col-md-6 col-xl-4 mt-2" key={goal.id}>
        <div className="card">
          <Link className="unmarked_link" to={`/goals/${goal.id}`}>
            <div className={goalMapper(goal)}>
              <h5 className="card-title">{goal.title}</h5>
            </div>
          </Link>
        </div>
      </div>
    ));
  }

  if (loading && !goals) {
    return <Loader />;
  }
  if (goals.length === 0) {
    return <h1 className="text-center">No goals found</h1>;
  }

  return (
    <div className="collection_container text-center">
      <h1>Goals</h1>

      <h5 className="pt-3 w-75 m-auto">One at a time</h5>

      <div className="p-3">
        <button
          className="primary_button m-2"
          onClick={() => navigate("/goals/add")}
        >
          Add
        </button>
        <button className="secondary_button m-2" onClick={() => navigate("/")}>
          Home
        </button>
      </div>

      <div className="row justify-content-center my-2">{viewMapper()}</div>
    </div>
  );
}

export default GoalPage;
