import { useHomepage } from "../contexts/HomepageContext";
import Loader from "../components/ui/Loader";
import { useState } from "react";
import { isCompletedToday } from "./utils/TaskUtils";
import WeekendTaskCard from '../components/weekendTask/WeekendTaskCard';
import GoalCard from '../components/goal/GoalCard';
import TaskCard from '../components/task/TaskCard';
import { toast } from "react-toastify";

function Collection() {
  const { homepage, getHomepage, loading } = useHomepage();

  const tasks = homepage?.tasks || [];
  const goal = homepage?.goal || null;
  const weekendTask = homepage?.maintenanceTask || null;
  const isWeekend = homepage?.dayType === "WEEKEND";
    const [lastToast, setLastToast] = useState(null);

  function isTaskFinished(task) {
    return isCompletedToday(task);
  }

  const goalFinished = goal ? goal.finished : false;

  const goalPlacement = (() => {
    if (!goal) return "none";
    if (isWeekend) return "bottom";
    return goalFinished ? "bottom" : "top";
  })();

  const weekendTaskFinished = weekendTask
    ? isCompletedToday(weekendTask)
    : false;

  const weekendTaskPlacement = (() => {
    if (!weekendTask) return "none";
    if (!isWeekend) return "none";
    return weekendTaskFinished ? "bottom" : "top";
  })();

     const encouragements = [
    "Nice work",
    "Well done",
    "Great job",
    "Keep it up",
    "One step at a time",
    "Progress made",
    "You did it",
    "Mission complete",
    "That's a win",
    "Momentum matters",
    "Another step forward",
    "Good effort",
    "Keep moving",
    "You're making progress",
    "Way to go",
    "Nicely done",
    "Small steps add up",
    "That's progress",
    "Keep building momentum",
    "You showed up today",
    "Every move counts",
    "Forward is forward",
    "Keep going",
    "Another one down",
    "You've got this",
  ];

  const determineToast = (list) => {
    if (!list?.length) return "Good job";

    let next = null;

    do {
      next = list[Math.floor(Math.random() * list.length)];
    } while (next === lastToast && list.length > 1);

    setLastToast(next);
    return next;
  };

  const handleComplete = async () => {
  toast.success(determineToast(encouragements));
  await getHomepage();
};

  function viewMapper() {
    const list = [];

    const sortedTasks = [...tasks].sort((a, b) => {
      return isTaskFinished(a) - isTaskFinished(b);
    });

    if (weekendTaskPlacement === "top") {
      list.push(<WeekendTaskCard
        key={`w${weekendTask.id}`}
        weekendTask={weekendTask}
        onComplete={handleComplete}
    />);
    }

    if (goalPlacement === "top") {
      list.push(<GoalCard key={`g${goal.id}`} goal={goal} onComplete={handleComplete} />);
    }

    // add sorted tasks
    sortedTasks.forEach((task) => {
      list.push(
        <TaskCard
      key={`t${task.id}`}
      task={task}
      onComplete={handleComplete}
    />
      );
    });

    if (weekendTaskPlacement === "bottom") {
      list.push(<WeekendTaskCard
        key={`w${weekendTask.id}`}
        weekendTask={weekendTask}
        onComplete={handleComplete}
    />);
    }

    if (goalPlacement === "bottom") {
      list.push(<GoalCard key={`g${goal.id}`} goal={goal} onComplete={handleComplete} />);
    }

    return list;
  }

  if (!homepage || loading) {
    return <Loader />;
  }

  return (
    <div className="collection_container">
      <div className="row justify-content-center">{viewMapper()}</div>
    </div>
  );
}

export default Collection;
