import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import Collection from '../Collection/Collection';
import Greeting from '../Greeting/Greeting';
import "./Home.css";

function Home() {

  const { user } = useUser();

  if (!user || user === null) {
    return (
      <div className="home_container text-center">
        <Greeting />
      </div>
    );
  } else {
    return (
      <div className="home_container text-center">
          <Greeting />
          <Collection />
          <div className='button_div'>
            <Link to='/todos/add'><button>Add To-Do</button></Link>
          </div>
        </div>
    );
  }
  
}

export default Home;