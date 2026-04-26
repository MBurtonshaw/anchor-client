import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTodo } from "../../contexts/TodoContext";
import Navbar from "../Navbar/Navbar";
import "./Edit.css";

function Edit() {
  const { todos } = useTodo();

  const { id } = useParams();

  const todo = todos.find((item) => item.id === Number(id));

  const is_finished = () => {
    if (todo.finished === true) {
      return <p className="mt-5">Finished!</p>;
    }
    return <p className="mt-5">In progress...</p>;
  };

  return (
    <div className="edit_container">
      <Navbar />
      <div class="card w-50 text-center m-auto">
        <div class="card-body">
          <h5 class="card-title">{todo.title}</h5>
          <p class="card-text">{todo.notes}</p>
          {is_finished()}
          <p>Created: {todo.createdAt}</p>
          <button
          /*onClick={useTodo.mark_finished}*/
          >
            Mark Finished
          </button>
          <button
          /*onClick={useTodo.delete}*/
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
