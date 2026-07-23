import { useAppointment } from "../../contexts/AppointmentContext";
import Loader from "../ui/Loader";
import AppointmentCard from "../appointment/AppointmentCard";

function AppointmentManager() {
  const { appointments, loading } = useAppointment();

  const sortedAppointments = [...appointments].sort((a, b) => {
  return a.finished - b.finished;
});

  const appointmentMapper = () => {
    return sortedAppointments.map(appointment => <AppointmentCard key={appointment.id} appointment={appointment} />);
  };

  if (loading && !appointments) {
    return <Loader />;
  }
  if (appointments.length === 0) {
    return <h1 className="text-center">No appointments found</h1>;
  }

  return (
    <div>
      <h1 className="text-center">Manage Appointments</h1>

    
      <div className="collection_container text-center row mt-4">
        {appointmentMapper()}
      </div>
    </div>
  );
}

export default AppointmentManager;
