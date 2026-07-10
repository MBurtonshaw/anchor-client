import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useHomepage } from "../contexts/HomepageContext";
import { useGoal } from "../contexts/GoalContext";
import { useTask } from "../contexts/TaskContext";
import Loader from "../components/ui/Loader";
import { toast } from "react-toastify";
import { isCompletedToday } from "./utils/TaskUtils";
import WeekendTaskCard from '../components/weekendTask/WeekendTaskCard';

function Collection() {
  const { homepage, getHomepage, loading } = useHomepage();
  const { completeGoal } = useGoal();
  const { completeTask } = useTask();
  const [savingId, setSavingId] = useState(null);
  const [lastToast, setLastToast] = useState(null);

  const tasks = homepage?.tasks || [];
  const goal = homepage?.goal || null;
  const weekendTask = homepage?.maintenanceTask || null;
  const isWeekend = homepage?.dayType === "WEEKEND";
  const navigate = useNavigate();

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
    "You've got this",
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
              navigate("/");
            }}
          >
            {savingId === `goal-${goal.id}` ? "..." : "done"}
          </button>
        )}
      </div>
    );
  };



  function isTaskFinished(task) {
    return isCompletedToday(task);
  }

  const goalFinished = goal ? goal.finished : false;

  const goalPlacement = (() => {
    if (!goal) return "none";
    if (isWeekend) return "bottom";
    return goalFinished ? "bottom" : "top";
  })();

  const weekendTaskFinished = weekendTask
    ? isCompletedToday(weekendTask)
    : false;

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
      list.push(<WeekendTaskCard
        key={`w${weekendTask.id}`}
        weekendTask={weekendTask}
    />);
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
                navigate("/");
              }}
            >
              {savingId === task.id ? "..." : "done"}
            </button>
          )}
        </div>,
      );
    });

    if (weekendTaskPlacement === "bottom") {
      list.push(<WeekendTaskCard
        key={`w${weekendTask.id}`}
        weekendTask={weekendTask}
    />);
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
