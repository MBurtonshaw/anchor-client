import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppointment } from "../../contexts/AppointmentContext";
import { useHomepage } from "../../contexts/HomepageContext";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";

function EditAppointment() {
  const [editTitle, setEditTitle] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const { appointments, deleteAppointment, updateAppointment, loading } = useAppointment();
  const { id } = useParams();
  const navigate = useNavigate();
  const { getHomepage } = useHomepage();
  const [savingId, setSavingId] = useState(null);

  const handleChange = (e, element) => element(e.target.value);
  const handleTitle = (e) => handleChange(e, setEditTitle);
  const handleNotes = (e) => handleChange(e, setEditNotes);
  const handleDueDate = (e) => handleChange(e, setEditDueDate);

  const appointmentId = Number(id);
  const appointment = appointments.find(a => a.id === appointmentId);

  useEffect(() => {
  if (appointment) {
    setEditTitle(appointment.title);
    setEditNotes(appointment.notes || "");
    setEditDueDate(appointment.dueDate || "");
  }
}, [appointment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavingId(1);
    try {
await updateAppointment(
      {
        title: editTitle,
        dueDate: editDueDate,
        notes: editNotes
      },
      appointment.id,
    );
    toast.success('Update success')
    await getHomepage();
    } finally {
      setSavingId(null);
    }
    
    navigate("/");
  };

  const handleDelete = async () => {
    if (!appointment) return;
    await deleteAppointment(appointment.id);
    await getHomepage();
    navigate("/");
  };

  if (loading && !appointment) {
    return <Loader />;
  }
  if (!appointment) return <h2>Appointment not found</h2>;

  return (
    <div className="component_container text-center">
      <div className="card text-center m-auto">
        <h1 className="card-title mt-4">Edit Appointment</h1>
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
          <label className="card-text d-block mb-2" htmlFor="date">
            Due Date:
          </label>
          <input
            className="text-center w-100"
            type="date"
            id="date"
            value={editDueDate}
            onChange={handleDueDate}
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
        <div className="p-3">
          <button className="primary_button m-2" disabled={savingId === 1} onClick={handleSubmit}>
            {savingId === 1 ? "..." : "Submit"}
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

export default EditAppointment;
