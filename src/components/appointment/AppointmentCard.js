import { Link, useNavigate } from "react-router-dom";
import { useAppointment } from "../../contexts/AppointmentContext";
import { useState } from "react";

function AppointmentCard({ appointment, onComplete }) {
  const { completeAppointment } = useAppointment();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  if (!appointment) return null;

  function isAppointmentFinished(appointment) {
    return appointment.finished;
  }

  function time_conversion(time) {
    if (!time) return "";

    const [hour, minute] = time.split(":");

    const date = new Date();
    date.setHours(Number(hour));
    date.setMinutes(Number(minute));

    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const determineAppointmentClasses = (appointment) => {
    if (isAppointmentFinished(appointment)) {
      return "card";
    } else {
      return "card card--primary-appointment";
    }
  };

  return (
    <div
      className="single_todo col-12 col-md-6 col-xl-4"
      key={`a${appointment.id}`}
    >
      <div className={determineAppointmentClasses(appointment)}>
        <Link className="unmarked_link" to={`/appointments/${appointment.id}`}>
          <div
            className={`card-body ${
              isAppointmentFinished(appointment)
                ? "card--finished"
                : "unfinished"
            }`}
          >
            <h5 className="card-title">{appointment.title}</h5>
            <p className="card-subtitle">
              {time_conversion(appointment.appointmentTime)}
            </p>
          </div>
        </Link>
      </div>

      {!isAppointmentFinished(appointment) && (
        <button
          className="done_button"
          disabled={saving}
          onClick={async () => {
            setSaving(true);

            try {
              await completeAppointment(appointment.id);
              await onComplete();
            } finally {
              setSaving(false);
            }
            navigate("/");
          }}
        >
          {saving ? "..." : "done"}
        </button>
      )}
    </div>
  );
}

export default AppointmentCard;
