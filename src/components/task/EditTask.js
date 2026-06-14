import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTask } from "../../contexts/TaskContext";
import Loader from "../ui/Loader";

function EditTask() {
  const [editTitle, setEditTitle] = useState("");
  const { tasks, deleteTask, updateTask, loading } = useTask();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e, element) => element(e.target.value);
  const handleTitle = (e) => handleChange(e, setEditTitle);

  const taskId = Number(id);
  const task = tasks.find((t) => t.id === taskId);

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

  if (loading && !tasks) {
    return <Loader />;
  }
  if (!task) return <h2>Task not found</h2>;

  return (
    <div className="component_container text-center">
      <div className="card text-center m-auto">
        <h1 className="card-title mt-4">Edit Task</h1>
        <div className="w-50 m-auto mt-5">
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
          <button className="primary_button m-2" onClick={handleSubmit}>
            Update
          </button>
          <button
            className="secondary_button m-2"
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button className="danger_button m-2" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
