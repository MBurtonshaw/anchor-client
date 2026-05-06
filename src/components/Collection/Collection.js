import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTodo } from "../../contexts/TodoContext";
import "./Collection.css";

function Collection() {
  const { todos } = useTodo();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (todos) {
      setLoading(false);
    }
  }, [todos]);

  const classMapper = (todo) => {
    if (!todo.finished) {
      return "card-body unfinished";
    } else {
      return "card-body finished";
    }
  };

  const sortedTodos = [...todos].sort((a, b) => {
    return a.finished - b.finished;
  });

  const todoMapper = () => {
    return sortedTodos.map((todo) => (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={todo.id}>
        <div className="card h-100">
          <Link className="unmarked_link" to={`/${todo.id}`}>
            <div className={classMapper(todo)}>
              <h5 className="card-title">{todo.title}</h5>
              <div></div>
            </div>
          </Link>
        </div>
      </div>
    ));
  };

  if (loading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  return (
    <div className="collection_container mt-5 p-5">
      <div className="row justify-content-center">{todoMapper()}</div>
    </div>
  );
}

export default Collection;
