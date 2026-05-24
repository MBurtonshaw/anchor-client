import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import Collection from "./Collection";
import Greeting from "./Greeting";

function Home() {
  const { user } = useUser();

  if (!user || user === null) {
    return (
      <div className="home_container_no_user text-center">
        <div className="card text-center m-auto">
          <div className="mt-4">
            <Greeting />
          </div>
          <div className="logout_button_div w-50 m-auto p-3">
            <Link className="home_login_link" to="/login">
              <button className="primary_button m-4">Login</button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="home_container text-center">
        <Greeting />
        
        <Collection />
      </div>
    );
  }
}

export default Home;
