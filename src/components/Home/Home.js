import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import Collection from '../Collection/Collection';
import "./Home.css";

function Home() {

  const { user } = useUser();

  if (!user) {
    return (
      <div className="home_container text-center">
        <h1 className='text-center'>Welcome</h1>
      </div>
    );
  } else {
    return (
      <div className="home_container text-center">
          <h1 className='text-center'>Welcome, {user.username}!</h1>
          <Collection />
          <div className='button_div'>
            <Link to='/todos/add'><button>Add To-Do</button></Link>
          </div>
        </div>
    );
  }
  
}

export default Home;