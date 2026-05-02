import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTodo } from "../../contexts/TodoContext";
import { useUser } from "../../contexts/UserContext";
import { getTodoById } from "../../service/TodoService";
import "./Todo.css";

function Todo() {
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  const { todos, markFinished, deleteTodo } = useTodo();

  const { user } = useUser();

  const { id } = useParams();

  useEffect(() => {
    if (!user?.userId) return;

    const todoId = Number(id);
    const found = todos.find((t) => t.id === todoId);

    if (found) {
      setTodo(found);
      setLoading(false);
      return;
    }

    const fetchTodo = async () => {
      try {
        const data = await getTodoById(user.userId, todoId);
        setTodo(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [todos, id, user]);

  if (loading) return <h2>Loading...</h2>;
  if (!todo) return <h2>Todo not found</h2>;

  return (
    <div className="edit_container">
      <div className="card w-50 text-center m-auto">
        <div className="card-body">
          <h5 className="card-title">{todo.title}</h5>
          <p className="card-text">{todo.notes}</p>

          <p className="mt-5">
            {todo.finished ? "Finished!" : "In progress..."}
          </p>

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

export default Todo;
