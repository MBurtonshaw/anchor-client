import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useUser } from "./UserContext";
import { useError } from "./ErrorContext";
import {
  getWeekendTask as getWeekendTaskApi,
  updateWeekendTask as updateWeekendTaskApi,
  completeWeekendTask as completeWeekendTaskApi,
} from "../service/WeekendTaskService";
const WeekendTaskContext = createContext(null);

export const useWeekendTask = () => useContext(WeekendTaskContext);

export const WeekendTaskProvider = ({ children }) => {
  const [weekendTask, setWeekendTask] = useState(null);
  const [ loading, setLoading ] = useState(true);

  const { user } = useUser();
  const { setError } = useError();

  const getWeekendTask = useCallback(async () => {
    if (!user?.userId) return;
    try {
      const res = await getWeekendTaskApi(user.userId);
      setWeekendTask(res);
    } catch (err) {
      setError(err.message);
    }
  }, [user?.userId, setError]);

  const updateWeekendTask = async (task, taskId) => {
    try {
      if (!user?.userId) return;
      await updateWeekendTaskApi(task, taskId);
      await getWeekendTask();
    } catch (err) {
      setError(err.message);
    }
  };

  const completeWeekendTask = async (taskId) => {
    try {
      if (!user?.userId) return;
      await completeWeekendTaskApi(taskId);
      await getWeekendTask();
    } catch (err) {
      setError(err.message);
    }
  };

useEffect(() => {
  const load = async () => {
    if (!user?.userId) {
      setWeekendTask(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    await getWeekendTask();
    setLoading(false);
  };

  load();
}, [user?.userId, getWeekendTask]);

  return (
    <WeekendTaskContext.Provider
      value={{
        weekendTask,
        getWeekendTask,
        updateWeekendTask,
        completeWeekendTask,
        loading
      }}
    >
      {children}
    </WeekendTaskContext.Provider>
  );
};
