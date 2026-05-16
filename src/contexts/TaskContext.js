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
  getTasksByUser,
  addTask as addTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
  lastCompleted as lastCompletedApi,
} from "../service/DailyService";
const TaskContext = createContext(null);

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
const [tasks, setTasks] = useState([]);

  const { user } = useUser();
  const { setError } = useError();

const getTasks = useCallback(async () => {
  if (!user?.userId) return;
  try {
    const res = await getTasksByUser();
    setTasks(res); 
  } catch (err) {
    setError(err.message);
  }
}, [user, setError]);

  const addTask = async (task) => {
    try {
      if (!user?.userId) return;
      await addTaskApi(task);
      await getTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTask = async (task, taskId) => {
    try {
      if (!user?.userId) return;
      await updateTaskApi(task, taskId);
      await getTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      if (!user?.userId) return;
      await deleteTaskApi(taskId);
      await getTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const completeTask = async (taskId) => {
    try {
      if (!user?.userId) return;
      await lastCompletedApi(taskId);
      await getTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      getTasks();
    } else {
      setTasks([]);
    }
  }, [user, getTasks]);

  return (
    <TaskContext.Provider
      value={{ tasks, getTasks, addTask, updateTask, deleteTask, lastCompleted }}
    >
      {children}
    </TaskContext.Provider>
  );
};
