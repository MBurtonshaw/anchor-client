import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTodo } from "../../contexts/GoalContext";
import "./Collection.css";

function Collection() {
  const { homepage } = useTodo();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (homepage) {
      setLoading(false);
    }
  }, [homepage]);

  function classMapper(todo) {
    if (todo.lastCompleted) {
      return "card-body finished";
    }
    return "card-body unfinished";
  }

  function goalMapper() {
    if (!homepage.generalTodo) {
      return null;
    }

    return (
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-6 col-xl-4">
          <div className="card border-warning">
            <Link
              className="unmarked_link"
              to={`/goals/${homepage.generalTodo.id}`}
            >
              <div className={classMapper(homepage.generalTodo)}>
                <h5 className="card-title">
                   {homepage.generalTodo.title}
                </h5>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  function dailyMapper() {
    if (!homepage.dailyTodos) {
      return null;
    }

    const list = [];

    for (let i = 0; i < homepage.dailyTodos.length; i++) {
      const todo = homepage.dailyTodos[i];

      list.push(
        <div className="single_todo col-12 col-md-6 col-xl-4" key={todo.id}>
          <div className="card">
            <Link className="unmarked_link" to={`/daily/${todo.id}`}>
              <div className={classMapper(todo)}>
                <h5 className="card-title">{todo.title}</h5>
              </div>
            </Link>
          </div>
        </div>
      );
    }

    return list;
  }

  if (loading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  return (
    <div className="collection_container mt-4 p-5">
      {goalMapper()}

      <div className="row justify-content-center">
        {dailyMapper()}
      </div>
    </div>
  );

}

export default Collection;
