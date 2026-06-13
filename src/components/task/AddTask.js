import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTask } from "../../contexts/TaskContext";

function AddTask() {
  const { addTask } = useTask();
  const [addTitle, setAddTitle] = useState("");

  const handleChange = (e, element) => {
    element(e.target.value);
  };

  const navigate = useNavigate();

  const handleTitle = (e) => handleChange(e, setAddTitle);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask({
      title: addTitle
    });
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
          <button className="primary_button m-2" onClick={handleSubmit}>
            Submit
          </button>
          <button className="secondary_button m-2" onClick={() => navigate('/')}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
