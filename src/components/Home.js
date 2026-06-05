import Collection from "./Collection";
import Greeting from "./Greeting";

function Home() {

    return (
      <div className="home_container text-center">
        <Greeting />
        <Collection />
      </div>
    );
}

export default Home;
