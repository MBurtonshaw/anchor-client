import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import "./Logout.css";

function Logout() {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <div className="logout_container text-center">
      <div className="card text-center m-auto">
        <h1 className="card-title mt-4">Logout</h1>
        <div className="logout_button_div w-50 m-auto p-3">
          <button className="logout_button m-4" onClick={handleSubmit}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
