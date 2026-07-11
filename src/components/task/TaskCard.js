import { Link, useNavigate } from "react-router-dom";
import { useTask } from "../../contexts/TaskContext";
import { useState } from "react";
import { isCompletedToday } from "../utils/TaskUtils";

function TaskCard({ task, onComplete }) {
  const { completeTask } = useTask();
  const navigate = useNavigate();
  const [savingId, setSavingId] = useState(null);

  if (!task) return null;

  function isTaskFinished(item) {
    return isCompletedToday(item);
  }

  function taskMapper(item) {
    return isTaskFinished(item)
      ? "card-body card--finished"
      : "card-body unfinished";
  }

  return (
    <div className="single_todo col-12 col-md-6 col-xl-4">
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
              await onComplete();
            } finally {
              setSavingId(null);
            }
            navigate("/");
          }}
        >
          {savingId === task.id ? "..." : "done"}
        </button>
      )}
    </div>
  );
}

export default TaskCard;
