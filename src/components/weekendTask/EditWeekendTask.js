import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHomepage } from "../../contexts/HomepageContext";
import { useWeekendTask } from "../../contexts/WeekendTaskContext";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";

function EditWeekendTask() {
  const [editTitle, setEditTitle] = useState("");
  const { getHomepage } = useHomepage();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    weekendTask,
    getWeekendTask,
    updateWeekendTask,
    // completeWeekendTask,
    loading,
  } = useWeekendTask();
  const [savingId, setSavingId] = useState(null);

  const handleChange = (e, element) => element(e.target.value);
  const handleTitle = (e) => handleChange(e, setEditTitle);

  useEffect(() => {
    if (!id) return;

    const taskId = Number(id);

    const load = async () => {
      const found = weekendTask?.id === taskId ? weekendTask : null;

      if (found) {
        setEditTitle(found.title);
        return;
      }

      const data = await getWeekendTask();
      setEditTitle(data.title);
    };

    load();
  }, [id, weekendTask, getWeekendTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavingId(1);
    try {
      await updateWeekendTask(
        {
          title: editTitle,
        },
        weekendTask.id,
      );
      toast.success("Update success");
      await getHomepage();
    } finally {
      setSavingId(null);
    }

    navigate("/");
  };

  // const handleComplete = async (e) => {
  //   e.preventDefault();
  //   setSavingId(1);
  //   try {
  //     await completeWeekendTask(weekendTask.id);
  //     await getHomepage();
  //   } finally {
  //     setSavingId(null);
  //   }
  // };

  if (loading) {
    return <Loader />;
  }
  if (!weekendTask) return <h2>Task not found</h2>;

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
          <button
            className="primary_button m-2"
            disabled={savingId === 1}
            onClick={handleSubmit}
          >
            {savingId === 1 ? "..." : "Submit"}
          </button>
          <button className="tertiary_button m-2" onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditWeekendTask;
