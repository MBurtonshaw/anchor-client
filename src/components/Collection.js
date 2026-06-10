import { Link } from "react-router-dom";
import { useHomepage } from "../contexts/HomepageContext";
import { useGoal } from "../contexts/GoalContext";
import { useTask } from "../contexts/TaskContext";
import { useWeekendTask } from "../contexts/WeekendTaskContext";

function Collection() {
  const { homepage, getHomepage, loading } = useHomepage();
  const { completeGoal } = useGoal();
  const { completeTask } = useTask();
  const { completeWeekendTask } = useWeekendTask();

  const tasks = homepage?.tasks || [];
  const goal = homepage?.goal || null;
  const weekendTask = homepage?.maintenanceTask || null;

  function isTaskFinished(task) {
    if (!task.lastCompleted || task.lastCompleted === 0) {
      return false;
    }

    const today = new Date().toDateString();

    const finished = new Date(task.lastCompleted + "T00:00:00").toDateString();

    return today === finished;
  }

  function taskMapper(task) {
    return isTaskFinished(task)
      ? "card-body card--finished"
      : "card-body unfinished";
  }

  function isGoalFinished(goal) {
    return goal.finished;
  }

  function goalMapper(goal) {
    return isGoalFinished(goal)
      ? "card-body card--finished"
      : "card-body unfinished";
  }

  function viewMapper() {
    const list = [];

    const sortedTasks = [...tasks].sort((a, b) => {
      return isTaskFinished(a) - isTaskFinished(b);
    });

    if (homepage.dayType === 'WEEKEND' && weekendTask) {
      const weekendCard = (
        <div
          className="single_todo col-12 col-md-6 col-xl-4"
          key={`t${weekendTask.id}`}
        >
          <div className="card">
            <Link className="unmarked_link" to={`/weekend/${weekendTask.id}`}>
              <div className={taskMapper(weekendTask)}>
                <h5 className="card-title">{weekendTask.title}</h5>
              </div>
            </Link>
          </div>
          {!isTaskFinished(weekendTask) && (
            <button
              className="done_button"
              onClick={ async () => {
                await completeWeekendTask(weekendTask.id);
                await getHomepage();
              }}
            >
              done
            </button>
          )}
        </div>
      );

      list.push(weekendCard);
    }

    if (goal) {
      const goalCard = (
        <div
          className="single_todo col-12 col-md-6 col-xl-4"
          key={`g${goal.id}`}
        >
          <div className="card card--primary">
            <Link className="unmarked_link" to={`/goals/${goal.id}`}>
              <div className={goalMapper(goal)}>
                <h5 className="card-title">{goal.title}</h5>
              </div>
            </Link>
          </div>
          <button className="done_button" onClick={() => {
            completeGoal(goal.id);
            getHomepage();
          }}>
            done
          </button>
        </div>
      );

      // unfinished goal goes first
      if (!isGoalFinished(goal)) {
        list.push(goalCard);
      }
    }

    // add sorted tasks
    sortedTasks.forEach((task) => {
      list.push(
        <div
          className="single_todo col-12 col-md-6 col-xl-4"
          key={`t${task.id}`}
        >
          <div className="card">
            <Link className="unmarked_link" to={`/tasks/${task.id}`}>
              <div className={taskMapper(task)}>
                <h5 className="card-title">{task.title}</h5>
              </div>
            </Link>
          </div>
          {!isTaskFinished(task) && (
            <button
              className="done_button"
              onClick={() => {
                completeTask(task.id);
                getHomepage();
              }}
            >
              done
            </button>
          )}
        </div>,
      );
    });

    // add finished goal at end
    if (goal && isGoalFinished(goal)) {
      list.push(
        <div
          className="single_todo col-12 col-md-6 col-xl-4"
          key={`g${goal.id}`}
        >
          <div className="card">
            <Link className="unmarked_link" to={`/goals/${goal.id}`}>
              <div className={goalMapper(goal)}>
                <h5 className="card-title">{goal.title}</h5>
              </div>
            </Link>
          </div>
        </div>,
      );
    }

    return list;
  }

  if (!homepage || loading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  return (
    <div className="collection_container">
      <div className="row justify-content-center">{viewMapper()}</div>
    </div>
  );
}

export default Collection;
