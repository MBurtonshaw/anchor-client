import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useUser } from "./UserContext";
import { useError } from "./ErrorContext";
import { useHomepage } from "./HomepageContext";
import {
  getGoals as getGoalsApi,
  addGoal as addGoalApi,
  updateGoal as updateGoalApi,
  deleteGoal as deleteGoalApi,
  completeGoal as completeGoalApi,
} from "../service/GoalService";
const GoalContext = createContext(null);

export const useGoal = () => useContext(GoalContext);

export const GoalProvider = ({ children }) => {
const [goals, setGoals] = useState([]);

  const { user } = useUser();
  const { setError } = useError();
  const { getHomepage } = useHomepage();

const getGoals = useCallback(async () => {
  if (!user?.userId) return;

  try {
    const res = await getGoalsApi();
    setGoals(res); 
  } catch (err) {
    setError(err.message);
  }
}, [user, setError]);

  const addGoal = async (goal) => {
    try {
      if (!user?.userId) return;
      await addGoalApi(goal);
      await getGoals();
      await getHomepage();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateGoal = async (goal, goalId) => {
    try {
      if (!user?.userId) return;
      await updateGoalApi(goal, goalId);
      await getGoals();
      await getHomepage();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      if (!user?.userId) return;
      await deleteGoalApi(goalId);
      await getGoals();
      await getHomepage();
    } catch (err) {
      setError(err.message);
    }
  };

  const completeGoal = async (goalId) => {
    try {
      if (!user?.userId) return;
      await completeGoalApi(goalId);
      await getGoals();
      await getHomepage();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      getGoals();
    } else {
      setGoals([]);
    }
  }, [user, getGoals]);

  return (
    <GoalContext.Provider
      value={{ goals, getGoals, addGoal, updateGoal, deleteGoal, completeGoal }}
    >
      {children}
    </GoalContext.Provider>
  );
};
