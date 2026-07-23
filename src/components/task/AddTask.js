import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTask } from "../../contexts/TaskContext";
import { useHomepage } from "../../contexts/HomepageContext";
import { toast } from "react-toastify";

function AddTask() {
  const { createTask } = useTask();
  const [addTitle, setAddTitle] = useState("");
  const { getHomepage } = useHomepage();
  const [savingId, setSavingId] = useState(null);

  const handleChange = (e, element) => {
    element(e.target.value);
  };

  const navigate = useNavigate();

  const handleTitle = (e) => handleChange(e, setAddTitle);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavingId(1);
    try {
      await createTask({
        title: addTitle,
      });
      toast.success("Added successfully");
      await getHomepage();
    } finally {
      setSavingId(null);
    }

    navigate("/");
  };

  return (
    <div className="component_container text-center">
      <div className="card text-center m-auto">
        <h1 className="card-title mt-4">Add a New Task</h1>
        <div className="w-50 m-auto mt-5">
          <label className="card-text d-block mb-2" htmlFor="title">
            Title:
          </label>
          <input
            className="text-center w-100"
            type="text"
            id="title"
            name="title"
            value={addTitle}
            onChange={handleTitle}
          />
        </div>
        <div className="p-3">
          <button
            disabled={savingId === 1}
            className="primary_button m-2"
            onClick={handleSubmit}
          >
            {savingId === 1 ? "..." : "Submit"}
          </button>
          <button
            className="secondary_button m-2"
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
