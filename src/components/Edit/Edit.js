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
      todo.id,
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
    <div className="edit_container text-center">
      <div className="card text-center m-auto">
        <h1 className="card-title mt-4">Edit To-Do</h1>
        <div className="mt-5">
          <label className="card-text d-block mb-2" htmlFor="title">
            Title:
          </label>
          <input
            className="text-center w-100"
            type="text"
            id="title"
            value={editTitle}
            onChange={handleTitle}
          />
        </div>
        <div className="my-4">
          <label className="card-text d-block mb-2" htmlFor="notes">
            Notes (Optional):
          </label>
          <input
            className="text-center w-100"
            type="text"
            id="notes"
            value={editNotes}
            onChange={handleNotes}
          />
        </div>
        <div className="">
          <label className="card-text d-block mb-2" htmlFor="priority">
            Priority:
          </label>
          <input
            className="text-center w-100"
            type="number"
            id="priority"
            min="1"
            max="5"
            value={editPriority}
            onChange={handlePriority}
          />
        </div>
        <div className="my-4">
          <label className="card-text d-block mb-2" htmlFor="date">
            Due Date (Optional):
          </label>
          <input
            className="text-center w-100"
            type="date"
            id="date"
            value={editDueDate}
            onChange={handleDueDate}
          />
        </div>
        <div className="p-3">
          <button className="edit_button m-2" onClick={handleSubmit}>
            Update
          </button>
          <button className="delete_button m-2" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
