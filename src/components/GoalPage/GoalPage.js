import { Link } from "react-router-dom";
import { useGoal } from "../../contexts/GoalContext";
import "./GoalPage.css";

function GoalPage() {
  const { goals } = useGoal();

  function goalMapper(goal) {
    return goal.finished
      ? "card-body finished"
      : "card-body unfinished";
  }

  function viewMapper() {
    // unfinished first, finished last
    const sortedGoals = [...goals].sort(
      (a, b) => Number(a.finished) - Number(b.finished)
    );

    return sortedGoals.map(goal => (
      <div
        className="single_todo col-12 col-md-6 col-xl-4 mt-4"
        key={goal.id}
      >
        <div className="card">
          <Link
            className="unmarked_link"
            to={`/goals/${goal.id}`}
          >
            <div className={goalMapper(goal)}>
              <h5 className="card-title">
                {goal.title}
              </h5>
            </div>
          </Link>
        </div>
      </div>
    ));
  }

  if (!goals) {
    return <h1 className="text-center">Loading...</h1>;
  }

  return (
  <div className="collection_container text-center">
    <h1 className="pt-4">
      Goals
    </h1>

    <h5 className="pt-4 w-75 m-auto">
      One at a time
    </h5>

    <div className="row justify-content-center mt-4 px-3 pb-4">
      {viewMapper()}
    </div>
  </div>
);
}

export default GoalPage;