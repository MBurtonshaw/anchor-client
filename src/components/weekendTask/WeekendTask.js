import { Link } from "react-router-dom";
import { useWeekendTask } from "../../contexts/WeekendTaskContext";
import Loader from "../ui/Loader";

function WeekendTask() {
  const { weekendTask, completeWeekendTask, loading } = useWeekendTask();

  const handleFinished = async () => {
    await completeWeekendTask(weekendTask.id);
  };

  const completedToday = () => {
    if (!weekendTask?.lastCompleted) return false;

    const today = new Date().toISOString().slice(0, 10);

    return weekendTask.lastCompleted === today;
  };

  const handleImage = () => {
    if (!completedToday()) {
      return (
        <div className="finished_image pt-5 pb-2">
          <img className="w-100" src="/blocks.png" alt="unfinished task" />
        </div>
      );
    } else {
      return (
        <div className="finished_image pt-5 pb-5">
          <img className="w-100" src="/checked.png" alt="completed task" />
        </div>
      );
    }
  };

  const handleButtons = () => {
    if (!completedToday()) {
      return (
        <div className="todo_buttons_div m-auto mt-5">
          <Link to={`/weekend/${weekendTask.id}/edit`}>
            <button className="primary_button w-100">Update</button>
          </Link>

          <button className="secondary_button w-100" onClick={handleFinished}>
            Complete
          </button>

          <Link to="/">
            <button className="tertiary_button w-100">Home</button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="todo_buttons_div">
          <Link to={`/`}>
            <button className="primary_button">Home</button>
          </Link>
        </div>
      );
    }
  };

  if (loading && !weekendTask) {
    return <Loader />;
  }
  if (!weekendTask) return <h2>Task not found</h2>;

  return (
    <div className="component_container">
      <div className="card text-center m-auto">
        <div className="card-body p-4">
          <h1 className="card-title">{weekendTask.title}</h1>

          {handleImage()}

          {handleButtons()}
        </div>
      </div>
    </div>
  );
}

export default WeekendTask;
