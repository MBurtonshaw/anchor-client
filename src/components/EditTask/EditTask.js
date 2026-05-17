import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTask } from "../../contexts/TaskContext";
import { useUser } from "../../contexts/UserContext";
import { getTaskById } from "../../service/TaskService";
import "./EditTask.css";

function EditTask() {
  const [task, setTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const { tasks, deleteTask, updateTask } = useTask();
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e, element) => element(e.target.value);
  const handleTitle = (e) => handleChange(e, setEditTitle);

  useEffect(() => {
    if (!task) return;
    setEditTitle(task.title || "");
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask(
      {
        title: editTitle,
      },
      task.id,
    );
    navigate("/");
  };

  const handleDelete = async () => {
    if (!task) return;
    await deleteTask(task.id);
    navigate("/");
  };

  useEffect(() => {
    if (!user?.userId) return;

    const taskId = Number(id);
    const found = tasks.find((t) => t.id === taskId);

    if (found) {
      setTask(found);
      setLoading(false);
      return;
    }

    const fetchTask = async () => {
      try {
        const data = await getTaskById(taskId);
        setTask(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [tasks, id, user]);

  if (loading) return <h2>Loading...</h2>;
  if (!task) return <h2>Task not found</h2>;

  return (
    <div className="edit_container text-center">
      <div className="card text-center m-auto">
        <h1 className="card-title mt-4">Edit Task</h1>
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

export default EditTask;
