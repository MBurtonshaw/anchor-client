import { Link } from "react-router-dom";
import { isCompletedToday } from "../utils/TaskUtils";

function TaskCard({ task, onComplete }) {
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
    <div className="single_todo col-12 col-md-6 col-xl-4 text-center">
      <div className="card">
        <Link className="unmarked_link" to={`/tasks/${task.id}`}>
          <div className={taskMapper(task)}>
            <h5 className="card-title">{task.title}</h5>
            <p className="card-spacer"></p>
          </div>
        </Link>
      </div>
      <Link to={`/tasks/${task.id}`}>
        <button className="done_button">Edit</button>
      </Link>
    </div>
  );
}

export default TaskCard;
