import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHomepage } from "../../contexts/HomepageContext";
import "./Collection.css";

function Collection() {
  const { homepage } = useHomepage();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [goal, setGoal] = useState(null);

  useEffect(() => {
    if (!homepage) return;

    setTasks(homepage.dailyTodos || []);
    setGoal(homepage.generalTodo || null);
    setLoading(false);
  }, [homepage]);

  function classMapper(todo) {
    if (todo.lastCompleted) {
      return "card-body finished";
    }
    return "card-body unfinished";
  }

  function taskMapper() {
  const list = [];

  if (goal) {
    list.push(
      <div className="single_todo col-12 col-md-6 col-xl-4" key={goal.id}>
        <div className="card current">
          <Link className="unmarked_link" to={`/goals/${goal.id}`}>
            <div className={classMapper(goal)}>
              <h5 className="card-title">{goal.title}</h5>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return [
    ...list,
    ...tasks.map(task => (
      <div className="single_todo col-12 col-md-6 col-xl-4" key={task.id}>
        <div className="card">
          <Link className="unmarked_link" to={`/tasks/${task.id}`}>
            <div className={classMapper(task)}>
              <h5 className="card-title">{task.title}</h5>
            </div>
          </Link>
        </div>
      </div>
    ))
  ];
}

  if (loading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  return (
    <div className="collection_container mt-4 p-5">
      <div className="row justify-content-center">{taskMapper()}</div>
    </div>
  );
}

export default Collection;
