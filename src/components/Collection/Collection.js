import { useState } from "react";
import { Link } from 'react-router-dom';
import { useTodo } from "../../contexts/TodoContext";
import "./Collection.css";

function Collection() {
  const { todos } = useTodo();

  return (
    <div className="collection_container mt-5">
      <div className="card-group">
        {todos.map((todo) => (
          <div className="card" key={todo.id}>
            <div className="card-body">
              <h5 className="card-title">{todo.title}</h5>
              <p className="card-text">{todo.notes}</p>
              <div>
                <Link to={`/todos/${todo.id}`}><button>Edit</button></Link>
                <button /*onClick={todos.markFinished(todo.id)}*/ >Mark Finished</button>
              </div>
              <p className="card-text">
                <small className="text-body-secondary">
                  Created {todo.createdAt}
                </small>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collection;
