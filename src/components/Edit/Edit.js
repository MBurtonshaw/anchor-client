import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTodo } from "../../contexts/TodoContext";
import { useUser } from "../../contexts/UserContext";
import { getTodoById } from "../../service/TodoService";
import "./Edit.css";

function Edit() {
  const [todo, setTodo] = useState(null);
  const [editTitle, setEditTitle] = useState(null);
  const [editPriority, setEditPriority] = useState(null);
  const [editNotes, setEditNotes] = useState(null);
  const [editDueDate, setEditDueDate] = useState(null);
  const [loading, setLoading] = useState(true);

  const { todos, markFinished, deleteTodo, updateTodo } = useTodo();

  const { user } = useUser();

  const { id } = useParams();

  const navigate = useNavigate();

  const handleChange = (e, element) => {
    element(e.target.value);
  };

  useEffect(() => {
    if (todo) {
      setEditTitle(todo.title);
      setEditPriority(todo.priority);
      setEditDueDate(todo.dueDate);
      setEditNotes(todo.notes);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [todo]);

  const handleTitle = (e) => handleChange(e, setEditTitle);
  const handleNotes = (e) => handleChange(e, setEditNotes);
  const handlePriority = (e) => handleChange(e, setEditPriority);
  const handleDueDate = (e) => handleChange(e, setEditDueDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(todo);
    updateTodo(
      {
        title: editTitle,
        priority: editPriority,
        dueDate: editDueDate,
        notes: editNotes,
        finished: false,
      },
      Number(id),
    );
    navigate("/");
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteTodo(id);
    navigate('/');
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
          <div className="card-title">
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="title"
              id="title"
              value={editTitle}
              onChange={handleTitle}
            />
          </div>
          <div className="card-text">
            <label htmlFor="priority">Priority: </label>
            <input
              type="number"
              min="1"
              max="5"
              name="priority"
              id="priority"
              value={editPriority}
              onChange={handlePriority}
            />
            <label htmlFor="due_date">Due Date: </label>
            <input
              type="date"
              name="due_date"
              id="due_date"
              value={editDueDate}
              onChange={handleDueDate}
            />
            <label htmlFor="notes">Notes: </label>
            <input
              type="text"
              name="notes"
              id="notes"
              value={editNotes}
              onChange={handleNotes}
            />
          </div>

          {/* <div className='mt-5'>
            <label htmlFor='finished'>{todo.finished ? "Finished!" : "In progress..."}</label>
            <input type='checkbox' name='finished' id='finished' checked={todo.finished} />
          </div> */}

          <button onClick={handleSubmit}>Update</button>

          <button onClick={() => markFinished(todo.id)}>Mark Finished</button>

          <button onClick={() => handleDelete()}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
