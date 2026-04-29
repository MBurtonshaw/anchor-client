import { useState } from "react";
import { Link } from "react-router-dom";
import { useTodo } from "../../contexts/TodoContext";
import "./Collection.css";

function Collection() {
  const { todos } = useTodo();

  return (
    <div className="collection_container mt-5 p-5">
      <div className="row justify-content-center">
        {todos.map((todo) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={todo.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{todo.title}</h5>
                <p className="card-text">{todo.notes}</p>
                <div>
                  <Link to={`/${todo.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button>Mark Finished</button>
                </div>
                <p className="card-text">
                  <small className="text-body-secondary">
                    Created {todo.createdAt}
                  </small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collection;
