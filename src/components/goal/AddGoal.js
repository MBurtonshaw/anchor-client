import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoal } from "../../contexts/GoalContext";
import { useHomepage } from "../../contexts/HomepageContext";
import { toast } from "react-toastify";

function AddGoal() {
  const { addGoal } = useGoal();
  const [addTitle, setAddTitle] = useState("");
  const [addNotes, setAddNotes] = useState("");
  const [addPriority, setAddPriority] = useState(1);
  const [addDueDate, setAddDueDate] = useState("");
  const { getHomepage } = useHomepage();
  const [savingId, setSavingId] = useState(null);

  const handleChange = (e, element) => {
    element(e.target.value);
  };

  const navigate = useNavigate();

  const handleTitle = (e) => handleChange(e, setAddTitle);
  const handleNotes = (e) => handleChange(e, setAddNotes);
  const handlePriority = (e) => handleChange(e, setAddPriority);
  const handleDueDate = (e) => handleChange(e, setAddDueDate);

  const handleSubmit = async (e, goal) => {
    e.preventDefault();
    setSavingId(1);
    try {
      await addGoal({
      title: addTitle,
      priority: addPriority,
      notes: addNotes,
      dueDate: addDueDate,
    });
    toast.success('Added successfully');
    await getHomepage();
    } finally {
      setSavingId(null);
    }
    navigate("/");
  };

  return (
    <div className="component_container text-center">
      <div className="card text-center m-auto">
        <h1 className="card-title mt-4">Add a New Goal</h1>
        <div className="mt-5 w-50 m-auto">
          <label className="card-text d-block mb-2" htmlFor="title">
            Title:
          </label>
          <input
            className="text-center w-100"
            type="text"
            id="title"
            name="title"
            onChange={handleTitle}
          />
        </div>
        <div className="w-50 m-auto my-4">
          <label className="card-text d-block mb-2" htmlFor="notes">
            Notes (Optional):
          </label>
          <input
            className="text-center w-100"
            type="text"
            id="notes"
            name="notes"
            onChange={handleNotes}
          />
        </div>
        <div className="w-50 m-auto">
          <label className="card-text d-block mb-2" htmlFor="priority">
            Priority:
          </label>
          <input
            className="text-center w-100"
            type="number"
            id="priority"
            name="priority"
            min="1"
            max="5"
            onChange={handlePriority}
          />
        </div>
        <div className="w-50 m-auto my-4">
          <label className="card-text d-block mb-2" htmlFor="date">
            Due Date (Optional):
          </label>
          <input
            className="text-center w-100"
            type="date"
            id="date"
            name="date"
            onChange={handleDueDate}
          />
        </div>
        <div className="p-3">
          <button className="primary_button m-2" disabled={savingId === 1} onClick={handleSubmit}>
            {savingId === 1 ? "..." : "Submit"}
          </button>
          <button className="secondary_button m-2" onClick={() => navigate('/')}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddGoal;
