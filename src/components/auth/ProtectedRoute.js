import { Navigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;