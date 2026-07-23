import { Link } from "react-router-dom";

function AppointmentHub() {
  return (
    <div className="component_container text-center">
      <div className="card text-center">
        <h1 className="card-title mt-4">Manage Appointments</h1>
        <div className="p-3 pb-4 pt-1 d-flex flex-column align-items-center mt-4">
        <Link to='/appointments/add'>
        <button className="button secondary_button m-3">Add Appointment</button>
        </Link>
        <Link to='/appointments/manage'>
        <button className="button tertiary_button m-3">Manage Appointments</button>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default AppointmentHub;
