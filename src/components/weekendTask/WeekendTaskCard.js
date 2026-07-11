import { Link, useNavigate } from "react-router-dom";
import { useWeekendTask } from "../../contexts/WeekendTaskContext";
import { useState } from "react";
import { isCompletedToday } from "../utils/TaskUtils";

function WeekendTaskCard({ weekendTask, onComplete }) {
  const { completeWeekendTask } = useWeekendTask();
  const navigate = useNavigate();
  const [savingId, setSavingId] = useState(null);

  if (!weekendTask) return null;

  function isTaskFinished(task) {
    return isCompletedToday(task);
  }

  const determineWeekendTaskClasses = () => {
    if (isTaskFinished(weekendTask)) {
      return "card";
    } else {
      return "card card--maintenance";
    }
  };

  function taskMapper(task) {
    return isTaskFinished(task)
      ? "card-body card--finished"
      : "card-body unfinished";
  }

  const finished = isTaskFinished(weekendTask);

  return (
    <div
      className="single_todo col-12 col-md-6 col-xl-4"
      key={`w${weekendTask.id}`}
    >
      <div className={determineWeekendTaskClasses()}>
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
              await onComplete();
            } finally {
              setSavingId(null);
            }
            navigate("/");
          }}
        >
          {savingId === `weekend-${weekendTask.id}` ? "..." : "done"}
        </button>
      )}
    </div>
  );
}

export default WeekendTaskCard;
