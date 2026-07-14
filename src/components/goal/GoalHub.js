import { Link } from "react-router-dom";

function GoalHub() {
  return (
    <div className="component_container text-center">
      <div className="card text-center">
        <h1 className="card-title mt-4">Manage Goals</h1>
        <div className="p-3 pb-4 pt-1 d-flex flex-column align-items-center mt-4">
        <Link to='/goals/accomplishments'>
        <button className="button primary_button m-3">
          View Accomplishments
        </button>
        </Link>
        <Link to='/goals/add'>
        <button className="button secondary_button m-3">Add Goal</button>
        </Link>
        <Link to='/goals/manage'>
        <button className="button tertiary_button m-3">Manage Goals</button>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default GoalHub;
