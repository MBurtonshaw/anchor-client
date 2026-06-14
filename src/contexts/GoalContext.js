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
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const { setError } = useError();
  const { getHomepage } = useHomepage();

  const getGoals = useCallback(async () => {
    if (!user?.userId) return;
    setLoading(true);
    try {
      const res = await getGoalsApi();
      setGoals(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user, setError]);

  const addGoal = async (goalData) => {
    try {
      if (!user?.userId) return;
      await addGoalApi(goalData);
      await Promise.all([getGoals(), getHomepage()]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateGoal = async (goalData, goalId) => {
    try {
      if (!user?.userId) return;
      await updateGoalApi(goalData, goalId);
      await Promise.all([getGoals(), getHomepage()]);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      if (!user?.userId) return;
      await deleteGoalApi(goalId);
      await Promise.all([getGoals(), getHomepage()]);
    } catch (err) {
      setError(err.message);
    }
  };

  const completeGoal = async (goalId) => {
    try {
      if (!user?.userId) return;
      await completeGoalApi(goalId);
      await Promise.all([getGoals(), getHomepage()]);
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
      value={{
        goals,
        getGoals,
        addGoal,
        updateGoal,
        deleteGoal,
        completeGoal,
        loading,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};
