import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useWeekendTask } from "../../contexts/WeekendTaskContext";

function WeekendTask() {
  const [task, setTask] = useState(null);
  const { weekendTask, completeWeekendTask, loading } = useWeekendTask();

  useEffect(() => {

    if (weekendTask) {
      setTask(weekendTask);
      return;
    }

  }, [weekendTask]);

  const handleFinished = async () => {
    await completeWeekendTask(task.id);
  };

const completedToday = () => {
  if (!task?.lastCompleted) return false;

  const today = new Date().toISOString().slice(0, 10);

  return task.lastCompleted === today;
};

  const handleImage = () => {
  if (!completedToday()) {
    return (
      <div className="finished_image pt-5 pb-2">
        <img
          className="w-100"
          src="/blocks.png"
          alt="unfinished task"
        />
      </div>
    );
  } else {
    return (
      <div className="finished_image pt-5 pb-5">
        <img
          className="w-100"
          src="/checked.png"
          alt="completed task"
        />
      </div>
    );
  }
};

const handleButtons = () => {
  if (!completedToday()) {
    return (
      <div className="todo_buttons_div m-auto mt-5">
          <Link to={`/weekend/${task.id}/edit`}><button className="primary_button w-100">Update</button></Link>

        <button
          className="secondary_button w-100"
          onClick={handleFinished}
        >
          Complete
        </button>

        <Link to='/'>
        <button
          className="tertiary_button w-100"
        >
          Home
        </button>
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

  if (loading) return <h2>Loading...</h2>;
  if (!task) return <h2>Task not found</h2>;

return (
  <div className="component_container">
    <div className="card text-center m-auto">
      <div className="card-body p-4">
        <h1 className="card-title">
          {task.title}
        </h1>

        {handleImage()}

          {handleButtons()}
      </div>
    </div>
  </div>
);
}

export default WeekendTask;
