import { Link } from "react-router-dom";
import { useHomepage } from "../../contexts/HomepageContext";
import "./Collection.css";

function Collection() {
  const { homepage } = useHomepage();

  const tasks = homepage?.tasks || [];
  const goal = homepage?.goal || null;

  function isTaskFinished(task) {
    if (!task.lastCompleted || task.lastCompleted === 0) {
      return false;
    }

    const today = new Date().toDateString();

    const finished = new Date(
      task.lastCompleted + "T00:00:00"
    ).toDateString();

    return today === finished;
  }

  function taskMapper(task) {
    return isTaskFinished(task)
      ? "card-body finished"
      : "card-body unfinished";
  }

  function isGoalFinished(goal) {
    return goal.finished;
  }

  function goalMapper(goal) {
    return isGoalFinished(goal)
      ? "card-body finished"
      : "card-body unfinished";
  }

  function viewMapper() {
    const list = [];

    // sort tasks so unfinished appear first
    const sortedTasks = [...tasks].sort((a, b) => {
      return isTaskFinished(a) - isTaskFinished(b);
    });

    // create goal card once
    if (goal) {
      const goalCard = (
        <div
          className="single_todo col-12 col-md-6 col-xl-4"
          key={`g${goal.id}`}
        >
          <div className="card current">
            <Link
              className="unmarked_link"
              to={`/goals/${goal.id}`}
            >
              <div className={goalMapper(goal)}>
                <h5 className="card-title">{goal.title}</h5>
              </div>
            </Link>
          </div>
        </div>
      );

      // unfinished goal goes first
      if (!isGoalFinished(goal)) {
        list.push(goalCard);
      }

      // finished goal goes last
      if (isGoalFinished(goal)) {
        list.push("GOAL_PLACEHOLDER");
      }
    }

    // add sorted tasks
    sortedTasks.forEach(task => {
      list.push(
        <div
          className="single_todo col-12 col-md-6 col-xl-4"
          key={`t${task.id}`}
        >
          <div className="card">
            <Link
              className="unmarked_link"
              to={`/tasks/${task.id}`}
            >
              <div className={taskMapper(task)}>
                <h5 className="card-title">{task.title}</h5>
              </div>
            </Link>
          </div>
        </div>
      );
    });

    // add finished goal at end
    if (goal && isGoalFinished(goal)) {
      list.push(
        <div
          className="single_todo col-12 col-md-6 col-xl-4"
          key={`g${goal.id}`}
        >
          <div className="card current">
            <Link
              className="unmarked_link"
              to={`/goals/${goal.id}`}
            >
              <div className={goalMapper(goal)}>
                <h5 className="card-title">{goal.title}</h5>
              </div>
            </Link>
          </div>
        </div>
      );
    }

    return list;
  }

  if (!homepage) {
    return <h1 className="text-center">Loading...</h1>;
  }

  return (
    <div className="collection_container mt-4 p-5">
      <div className="row justify-content-center">
        {viewMapper()}
      </div>
    </div>
  );
}

export default Collection;