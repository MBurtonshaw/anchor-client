import { Navigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="component_container text-center m-auto m-5">
        <div className="card text-center">
          <h1 className="card-title p-5">Loading...</h1>
          <h4>Please wait</h4>
          <p className="p-5">May need a moment to wake up</p>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
