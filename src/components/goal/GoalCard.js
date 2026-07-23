import { Link, useNavigate } from "react-router-dom";
import { useGoal } from "../../contexts/GoalContext";
import { useHomepage } from "../../contexts/HomepageContext";
import { useState } from "react";

function GoalCard({ goal, onComplete }) {
  const { completeGoal } = useGoal();
  const navigate = useNavigate();
  const { homepage } = useHomepage();
  const [saving, setSaving] = useState(false);

  if (!goal) return null;

  function isGoalFinished(goal) {
    return goal.finished;
  }

  const determineGoalClasses = (goal) => {
    if (isGoalFinished(goal)) {
      return "card";
    } else {
      if (homepage?.dayType === "WEEKEND") {
        return "card card--primary-weekend";
      } else {
        return "card card--primary";
      }
    }
  };

  const determineSubtext = (goal) => {
    if (goal.title === homepage.goal.title && homepage.dayType === 'WEEKEND') {
      return "Weekend Mode";
    } else if (goal.title === homepage.goal.title && homepage.dayType === 'WEEKDAY') {
      return "Current Goal";
    } else {
      return <br></br>;
    }
  }

  return (
    <div className="single_todo col-12 col-md-6 col-xl-4" key={`g${goal.id}`}>
      <div className={determineGoalClasses(goal)}>
        <Link className="unmarked_link" to={`/goals/${goal.id}`}>
          <div
            className={`card-body ${
              isGoalFinished(goal) ? "card--finished" : "unfinished"
            }`}
          >
            <h5 className="card-title">{goal.title}</h5>
            <p className="card-subtitle">
              {determineSubtext(goal)}
            </p>
          </div>
        </Link>
      </div>

      {!isGoalFinished(goal) && (
        <button
          className="done_button"
          disabled={saving}
          onClick={async () => {
            setSaving(true);

            try {
              await completeGoal(goal.id);
              await onComplete();
            } finally {
              setSaving(null);
            }
            navigate("/");
          }}
        >
          {saving ? "..." : "done"}
        </button>
      )}
    </div>
  );
}

export default GoalCard;
