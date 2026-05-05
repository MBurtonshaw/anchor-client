import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTodo } from "../../contexts/TodoContext";
import { useUser } from "../../contexts/UserContext";
import { getTodoById } from "../../service/TodoService";
import "./Edit.css";

function Edit() {
  const [todo, setTodo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  const { todos, deleteTodo, updateTodo } = useTodo();
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e, element) => element(e.target.value);

  const handleTitle = (e) => handleChange(e, setEditTitle);
  const handleNotes = (e) => handleChange(e, setEditNotes);
  const handlePriority = (e) => handleChange(e, setEditPriority);
  const handleDueDate = (e) => handleChange(e, setEditDueDate);

  useEffect(() => {
    if (todo) {
      setEditTitle(todo.title || "");
      setEditPriority(todo.priority ?? "");
      setEditDueDate(todo.dueDate || "");
      setEditNotes(todo.notes || "");
      setFinished(todo.finished ?? false);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [todo, finished]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTodo(
      {
        title: editTitle,
        priority: editPriority,
        dueDate: editDueDate,
        notes: editNotes,
      },
      todo.id
    );
    navigate("/");
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    navigate("/");
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

  if (loading) return <h2>Loading...</h2>;
  if (!todo) return <h2>Todo not found</h2>;

  return (
    <div className="add_container text-center">
      <div className="card w-50 text-center m-auto">
        <h1 className="card-title mt-4">Edit To-Do</h1>

        {/* TITLE */}
        <div className="w-50 m-auto mt-5">
          <label className="card-text mx-1" htmlFor="title">
            Title:
          </label>
          <input
            className="mx-1"
            type="text"
            id="title"
            value={editTitle}
            onChange={handleTitle}
          />
        </div>

        {/* NOTES */}
        <div className="w-100 my-4">
          <label className="card-text mx-1" htmlFor="notes">
            Notes:
          </label>
          <input
            className="mx-1"
            type="text"
            id="notes"
            value={editNotes}
            onChange={handleNotes}
          />
        </div>

        {/* PRIORITY */}
        <div className="w-100">
          <label className="card-text mx-1" htmlFor="priority">
            Priority:
          </label>
          <input
            className="mx-1"
            type="number"
            id="priority"
            min="1"
            max="5"
            value={editPriority}
            onChange={handlePriority}
          />
        </div>

        {/* DUE DATE */}
        <div className="w-100 my-4">
          <label className="card-text mx-1" htmlFor="date">
            Due:
          </label>
          <input
            className="mx-1"
            type="date"
            id="date"
            value={editDueDate}
            onChange={handleDueDate}
          />
        </div>

        {/* BUTTONS */}
        <div className="w-50 m-auto p-3">
          <button onClick={handleSubmit}>Update</button>
          <button onClick={handleDelete} className="mx-2">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;