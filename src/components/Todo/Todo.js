import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const createdAtHandler = () => {
    if (!todo?.createdAt) return "";
    return todo.createdAt.slice(0, 10);
  };

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
        const data = await getTodoById(todoId);
        setTodo(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [todos, id, user]);

  const handleDelete = async () => {
    navigate("/");
    await deleteTodo(todo.id);
  };

  const handleFinished = async () => {
    await markFinished(todo.id);
  };

  const handleImage = () => {
    if (!todo.finished) {
      return (
        <div className="finished_image">
          <img
            className="w-100"
            src="/blocks.png"
            alt="three squares representing a loading state"
          />
        </div>
      );
    } else {
      return (
        <div className="finished_image">
          <img
            className="w-100"
            src="/checked.png"
            alt="three squares representing a loading state"
          />
        </div>
      );
    }
  };

  const handleButtons = () => {
    if (!todo.finished) {
      return (
        <div className="todo_buttons_div">
          <Link to={`/todos/${todo.id}/edit`}>
            <button className="todo_button primary">Update</button>
          </Link>
          <button className="todo_button secondary" onClick={handleFinished}>
            Mark Finished
          </button>
          <button className="todo_button danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      );
    } else {
      return (
        <div className="todo_buttons_div">
          <Link to={`/`}>
            <button className="todo_button">Home</button>
          </Link>
        </div>
      );
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (!todo) return <h2>Todo not found</h2>;

  return (
    <div className="todo_container">
      <div className="card todo_subcontainer text-center m-auto">
        <div className="card-body">
          <h1 className="card-title">{todo.title}</h1>
          <p className="card-text w-50 m-auto p-5">{todo.notes}</p>

          {handleImage()}

          <p className="mt-5">Created: {createdAtHandler()}</p>

          {handleButtons()}
        </div>
      </div>
    </div>
  );
}

export default Todo;
