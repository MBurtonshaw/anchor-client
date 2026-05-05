import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import "./Logout.css";

function Logout() {

  const { logout } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  }

  return (
    <div className="home_container text-center">
      <h1 className='text-center m-4'>Logout</h1>
      <button onClick={ handleSubmit }>Logout</button>
    </div>
  );
}

export default Logout;