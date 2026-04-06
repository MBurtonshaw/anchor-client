import { Link } from 'react-router-dom';
import "./Home.css";

function Home() {
  return (
    <div className="home_container text-center">
      <h1 className='text-center m-4'>Welcome</h1>
      <Link to="/register">Register</Link>
      <br></br>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Home;