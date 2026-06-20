import { Navigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import Loader from '../ui/Loader';

function ProtectedRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <Loader />
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
