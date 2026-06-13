import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGoal } from "../../contexts/GoalContext";
import { useUser } from "../../contexts/UserContext";
import { getGoalById } from "../../service/GoalService";

function EditGoal() {
  const [goal, setGoal] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [loading, setLoading] = useState(true);
  const { goals, deleteGoal, updateGoal } = useGoal();
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e, element) => element(e.target.value);
  const handleTitle = (e) => handleChange(e, setEditTitle);
  const handleNotes = (e) => handleChange(e, setEditNotes);
  const handlePriority = (e) => handleChange(e, setEditPriority);
  const handleDueDate = (e) => handleChange(e, setEditDueDate);

  useEffect(() => {
    if (!goal) return;

    setEditTitle(goal.title || "");
    setEditPriority(goal.priority ?? "");
    setEditDueDate(goal.dueDate || "");
    setEditNotes(goal.notes || "");
  }, [goal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateGoal(
      {
        title: editTitle,
        priority: editPriority,
        dueDate: editDueDate,
        notes: editNotes,
      },
      goal.id,
    );
    navigate("/");
  };

  const handleDelete = async () => {
    if (!goal) return;
    await deleteGoal(goal.id);
    navigate("/");
  };

  useEffect(() => {
    if (!user?.userId) return;

    const goalId = Number(id);
    const found = goals.find((g) => g.id === goalId);

    if (found) {
      setGoal(found);
      setLoading(false);
      return;
    }

    const fetchGoal = async () => {
      try {
        const data = await getGoalById(goalId);
        setGoal(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [goals, id, user]);

  if (loading) return <h2>Loading...</h2>;
  if (!goal) return <h2>Goal not found</h2>;

  return (
    <div className="component_container text-center">
      <div className="card text-center m-auto">
        <h1 className="card-title mt-4">Edit Goal</h1>
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
        <div className="w-50 m-auto my-4">
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
        <div className="w-50 m-auto">
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
        <div className="w-50 m-auto my-4">
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
          <button className="primary_button m-2" onClick={handleSubmit}>
            Update
          </button>
          <button className="secondary_button m-2" onClick={() => navigate('/')}>
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

export default EditGoal;
