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
    const trimmedCreatedAt = todo.createdAt.slice(0, 10);
    return(`${trimmedCreatedAt}`);
  }

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
      navigate('/');
      await deleteTodo(todo.id);
    }

    const handleFinished = async() => {
      await markFinished(todo.id);
    }

    const handleImage = () => {
      if (!todo.finished) {
        return(
          <div className='finished_image'>
            <img className='w-100' src='/blocks.png' alt='three squares representing a loading state'/>
          </div>
        );
      } else {
        return(
          <div className='finished_image'>
            <img className='w-100' src='/checked.png' alt='three squares representing a loading state'/>
          </div>
        );
      }
    }

    const renderButton = () => {
      if (!todo.finished) {
        return <button onClick={handleFinished}>Mark Finished</button>;
    }
  }

  if (loading) return <h2>Loading...</h2>;
  if (!todo) return <h2>Todo not found</h2>;

  return (
    <div className="edit_container">
      <div className="card w-50 text-center m-auto">
        <div className="card-body">
          <h5 className="card-title">{todo.title}</h5>
          <p className="card-text w-50 m-auto p-5">{todo.notes}</p>

          {handleImage()}

          <p className='mt-5'>Created: {createdAtHandler()}</p>

          <Link to={`/todos/${todo.id}/edit`}>
            <button>Update</button>
          </Link>

          <button onClick={handleFinished}>Mark Finished</button>

          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
