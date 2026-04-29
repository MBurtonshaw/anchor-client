import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTodo } from "../../contexts/TodoContext";
import "./Edit.css";

function Edit() {
  const { todos, markFinished, deleteTodo } = useTodo();

  const { id } = useParams();

  const todo = todos.find((item) => item.id === Number(id));

  const is_finished = () => {
    if (!todo) return null;
    if (todo.finished === true) {
      return <p className="mt-5">Finished!</p>;
    }
    return <p className="mt-5">In progress...</p>;
  };

  if (!todo) {
    return (
     <h2>Loading...</h2>
    );
  }
  return(
     <div className="edit_container">
        <div className="card w-50 text-center m-auto">
          <div className="card-body">
            <h5 className="card-title">{todo.title}</h5>
            <p className="card-text">{todo.notes}</p>
            {is_finished()}
            <p>Created: {todo.createdAt}</p>
            <Link to={`/todos/${todo.id}/edit`}>
              <button>Update</button>
            </Link>
            <button onClick={() => markFinished(todo.id)}>Mark Finished</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      </div>
  );
}

export default Edit;
