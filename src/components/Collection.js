import { useState } from "react";
import { Link } from "react-router-dom";
import { useHomepage } from "../contexts/HomepageContext";
import { useGoal } from "../contexts/GoalContext";
import { useTask } from "../contexts/TaskContext";
import { useWeekendTask } from "../contexts/WeekendTaskContext";
import Loader from "../components/ui/Loader";
import { toast } from "react-toastify";

function Collection() {
  const { homepage, getHomepage, loading } = useHomepage();
  const { completeGoal } = useGoal();
  const { completeTask } = useTask();
  const { completeWeekendTask } = useWeekendTask();
  const [savingId, setSavingId] = useState(null);
  const [lastToast, setLastToast] = useState(null);

  const tasks = homepage?.tasks || [];
  const goal = homepage?.goal || null;
  const weekendTask = homepage?.maintenanceTask || null;
  const isWeekend = homepage?.dayType === "WEEKEND";

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
            disabled={savingId === `goal-${goal.id}`}
            onClick={async () => {
              setSavingId(`goal-${goal.id}`);

              try {
                await completeGoal(goal.id);
                toast.success(determineToast(encouragements));
                await getHomepage();
              } finally {
                setSavingId(null);
              }
            }}
          >
            {savingId === `goal-${goal.id}` ? "..." : "done"}
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
            disabled={savingId === `weekend-${weekendTask.id}`}
            onClick={async () => {
              setSavingId(`weekend-${weekendTask.id}`);

              try {
                await completeWeekendTask(weekendTask.id);
                toast.success(determineToast(encouragements));
                await getHomepage();
              } finally {
                setSavingId(null);
              }
            }}
          >
            {savingId === `weekend-${weekendTask.id}` ? "..." : "done"}
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
              disabled={savingId === task.id}
              onClick={async () => {
                setSavingId(task.id);
                try {
                  await completeTask(task.id);
                  toast.success(determineToast(encouragements));
                  await getHomepage();
                } finally {
                  setSavingId(null);
                }
              }}
            >
              {savingId === task.id ? "..." : "done"}
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
    return <Loader />;
  }

  return (
    <div className="collection_container">
      <div className="row justify-content-center">{viewMapper()}</div>
    </div>
  );
}

export default Collection;
