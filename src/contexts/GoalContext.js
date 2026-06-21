import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useError } from "../contexts/ErrorContext";
import handleError from "../components/utils/HandleError";
import { useUser } from "./UserContext";
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
  const { setError } = useError();

  const { user } = useUser();

  const getGoals = useCallback(async () => {
    if (!user?.userId) {
      setGoals([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const res = await getGoalsApi();
      setGoals(res);
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  }, [user, setError]);

  const addGoal = async (goalData) => {
    if (!user?.userId) {
      setGoals([]);
      setLoading(false);
      return;
    }

    try {
      await addGoalApi(goalData);
      await getGoals();
    } catch (err) {
      handleError(err, setError);
    }
  };

  const updateGoal = async (goalData, goalId) => {
        if (!user?.userId) {
      setGoals([]);
      setLoading(false);
      return;
    }
     setLoading(true);
    try {
      await updateGoalApi(goalData, goalId);
      await getGoals();
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  const deleteGoal = async (goalId) => {
        if (!user?.userId) {
      setGoals([]);
      setLoading(false);
      return;
    }
    setLoading(true); 
    try {
      await deleteGoalApi(goalId);
      await getGoals();
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  const completeGoal = async (goalId) => {
        if (!user?.userId) {
      setGoals([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      await completeGoalApi(goalId);
      await getGoals();
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
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
