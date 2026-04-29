import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useTodo } from "../../contexts/TodoContext";
import "./Todo.css";

function Todo() {
  const { todos } = useTodo();
  const [todo, setTodo] = useState(null);
  const pathname_id = window.location.pathname.slice(1);
  console.log(todos);

  function todoMapper() {
    return todos.map((item, i) => {
      if (item.id === Number(pathname_id)) {
        return <h1 key={i}>{item.title}</h1>;
      }
    });
  }

  if (todos) {
    return <div className="todo_container text-center">{todoMapper()}</div>;
  }
}

export default Todo;
