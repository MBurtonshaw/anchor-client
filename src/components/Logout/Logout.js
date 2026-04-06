import { Link } from 'react-router-dom';
import "./Logout.css";

function Logout() {
  return (
    <div className="home_container text-center">
      <h1 className='text-center m-4'>Logout</h1>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Logout;