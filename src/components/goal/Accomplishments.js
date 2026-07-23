import { useGoal } from "../../contexts/GoalContext";
import { useState, useEffect } from "react";
import Loader from "../ui/Loader";
import GoalCard from "../goal/GoalCard";

function Accomplishments() {
  const { goals } = useGoal();
  const [accomplishments, setAccomplishments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let tempList = [];
    if (goals) {
      try {
        goals.forEach((goal) => {
          if (goal.finished) {
            tempList.push(goal);
          }
        });
        setAccomplishments(tempList);
      } finally {
        setLoading(false);
      }
    }
  }, [goals]);

  const accomplishmentMapper = () => {
    return accomplishments.map((item, i) => <GoalCard goal={item} key={i} />);
  };

  if (loading) {
    return <Loader />;
  }

  if (accomplishments.length < 1) {
    return <h2 className="text-center m-5">Nothing here, yet!</h2>;
  }

  return (
    <div className="collection_container text-center row">
      <h1 className="mb-5">Accomplishments</h1>
      {accomplishmentMapper()}
    </div>
  );
}

export default Accomplishments;
