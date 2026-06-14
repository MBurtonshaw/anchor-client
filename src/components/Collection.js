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
  const isWeekend = homepage?.dayType === "WEEKEND";

  const determineGoalClasses = (goal) => {
    if (isGoalFinished(goal)) {
      return "card";
    } else {
      if (isWeekend) {
        return "card card--primary-weekend";
      } else {
        return "card card--primary";
      }
    }
  };

  const determineWeekendTaskClasses = (wTask) => {
    if (isTaskFinished(wTask)) {
      return "card";
    } else {
      return "card card--maintenance";
    }
  };

  const renderGoal = () => {
    if (!goal) return null;

    return (
      <div className="single_todo col-12 col-md-6 col-xl-4" key={`g${goal.id}`}>
        <div className={determineGoalClasses(goal)}>
          <Link className="unmarked_link" to={`/goals/${goal.id}`}>
            <div
              className={`card-body ${
                isGoalFinished(goal) ? "card--finished" : "unfinished"
              }`}
            >
              <h5 className="card-title">{goal.title}</h5>
              <p className="card-subtitle">
                {isWeekend ? "Current Goal • Weekend Mode" : "Current Goal"}
              </p>
            </div>
          </Link>
        </div>

        {!isGoalFinished(goal) && (
          <button
            className="done_button"
            onClick={async () => {
              await completeGoal(goal.id);
              await getHomepage();
            }}
          >
            done
          </button>
        )}
      </div>
    );
  };

  const renderWeekendTask = () => {
    if (!weekendTask) return null;

    const finished = isTaskFinished(weekendTask);

    return (
      <div
        className="single_todo col-12 col-md-6 col-xl-4"
        key={`w${weekendTask.id}`}
      >
        <div className={determineWeekendTaskClasses(weekendTask)}>
          <Link className="unmarked_link" to={`/weekend/${weekendTask.id}`}>
            <div className={taskMapper(weekendTask)}>
              <h5 className="card-title">{weekendTask.title}</h5>
              <p className="card-subtitle">Weekend Task</p>
            </div>
          </Link>
        </div>

        {!finished && (
          <button
            className="done_button"
            onClick={async () => {
              await completeWeekendTask(weekendTask.id);
              await getHomepage();
            }}
          >
            done
          </button>
        )}
      </div>
    );
  };

  function isTaskFinished(task) {
    if (!task.lastCompleted || task.lastCompleted === 0) {
      return false;
    }
    const today = new Date().toDateString();
    const finished = new Date(task.lastCompleted + "T00:00:00").toDateString();
    return today === finished;
  }

  const goalFinished = goal ? goal.finished : false;

  const goalPlacement = (() => {
    if (!goal) return "none";
    if (isWeekend) return "bottom";
    return goalFinished ? "bottom" : "top";
  })();

  const weekendTaskFinished = weekendTask ? isTaskFinished(weekendTask) : false;

  const weekendTaskPlacement = (() => {
    if (!weekendTask) return "none";
    if (!isWeekend) return "none";
    return weekendTaskFinished ? "bottom" : "top";
  })();

  function taskMapper(task) {
    return isTaskFinished(task)
      ? "card-body card--finished"
      : "card-body unfinished";
  }

  function isGoalFinished(goal) {
    return goal.finished;
  }

  function viewMapper() {
    const list = [];

    const sortedTasks = [...tasks].sort((a, b) => {
      return isTaskFinished(a) - isTaskFinished(b);
    });

    if (weekendTaskPlacement === "top") {
      list.push(renderWeekendTask());
    }

    if (goalPlacement === "top") {
      list.push(renderGoal());
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
                <p className="card-spacer"></p>
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

    if (weekendTaskPlacement === "bottom") {
      list.push(renderWeekendTask());
    }

    if (goalPlacement === "bottom") {
      list.push(renderGoal());
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
