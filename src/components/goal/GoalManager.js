import { useGoal } from "../../contexts/GoalContext";
import Loader from "../ui/Loader";
import GoalCard from "../goal/GoalCard";
import SearchGoal from "../goal/SearchGoal";
import { useState } from "react";

function GoalManager() {
  const { goals, currentGoal, loading } = useGoal();
  //create state
  const [searchGoal, setSearchGoal] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [resultsMessage, setResultsMessage] = useState(null);

  //add function that compares the value in the search input upon button click to the goal titles
  //if there's a match, push that goal to  state

  const searchFunction = (searchable) => {
    let foundGoal = null;

    for (let i = 0; i < goals.length; i++) {
      if (goals[i].title.toUpperCase().includes(searchable.toUpperCase())) {
        foundGoal = goals[i];
        break;
      }
    }

    setSearchGoal(foundGoal);

    if (foundGoal) {
      setResultsMessage(null);
    } else {
      setResultsMessage("No results found");
    }
  };

  const goalMapper = () => {
    return goals.map((mission, i) => <GoalCard key={i} goal={mission} />);
  };

  const searchMapper = () => {
    if (searchGoal != null) {
      return (
        <div className="collection_container text-center">
          <h4 className="">Results:</h4>
          <SearchGoal goal={searchGoal} />
        </div>
      );
    }
    if (resultsMessage != null) {
      return <h4 className="text-center m-5">{resultsMessage}</h4>;
    }
  };

  if (loading && !goals) {
    return <Loader />;
  }
  if (goals.length === 0) {
    return <h1 className="text-center">No goals found</h1>;
  }

  return (
    <div>
      <h1 className="text-center">Manage Goals</h1>

      <div className="collection_container text-center">
        <h4>Search</h4>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => searchFunction(searchTerm)}>go</button>
      </div>

      {/*conditional component here that renders if the list in state is populated*/}
      {searchMapper()}
      <div className="collection_container text-center row">
        <h4 className="text-start">Current Goal:</h4>
        <GoalCard goal={currentGoal} />
      </div>
      <div className="collection_container text-center row">
        <h4 className="text-start">Goals:</h4>
        {goalMapper()}
      </div>
    </div>
  );
}

export default GoalManager;
