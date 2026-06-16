import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useUser } from "./UserContext";
import { useError } from "./ErrorContext";
import handleError from '../components/auth/HandleError';
import {
  getWeekendTask as getWeekendTaskApi,
  updateWeekendTask as updateWeekendTaskApi,
  completeWeekendTask as completeWeekendTaskApi,
} from "../service/WeekendTaskService";
const WeekendTaskContext = createContext(null);

export const useWeekendTask = () => useContext(WeekendTaskContext);

export const WeekendTaskProvider = ({ children }) => {
  const [weekendTask, setWeekendTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const { setError } = useError();

  const getWeekendTask = useCallback(async () => {
    if (!user?.userId) {
      setWeekendTask(null);
      return null;
    }

    setLoading(true);
    try {
      const res = await getWeekendTaskApi(user.userId);
      setWeekendTask(res);
      return res;
    } catch (err) {
      handleError(err, setError);
          return null;
    } finally {
      setLoading(false);
    }
  }, [user?.userId, setError]);

  const updateWeekendTask = async (task, taskId) => {
    setLoading(true);
    try {
      await updateWeekendTaskApi(task, taskId);
      await getWeekendTask();
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  const completeWeekendTask = async (taskId) => {
    setLoading(true);
    try {
      await completeWeekendTaskApi(taskId);
      await getWeekendTask();
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      if (!user?.userId) {
        setWeekendTask(null);
        setLoading(false);
        return;
      }

      await getWeekendTask();
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
        loading,
      }}
    >
      {children}
    </WeekendTaskContext.Provider>
  );
};
