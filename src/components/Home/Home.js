import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import Navbar from '../Navbar/Navbar';
import Collection from '../Collection/Collection';
import "./Home.css";

function Home() {

  const { user } = useUser();

  if (!user) {
    return (
      <div className="home_container text-center">
        <Navbar />
        <h1 className='text-center'>Welcome</h1>
      </div>
    );
  } else {
    return (
      <div className="home_container text-center">
          <Navbar />
          <h1 className='text-center'>Welcome, {user.username}!</h1>
          <Collection />
        </div>
    );
  }
  
}

export default Home;