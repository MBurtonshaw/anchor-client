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
  getTasks as getTasksApi,
  getTaskById as getTaskByIdApi,
  addTask as addTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
  completeTask as completeTaskApi,
} from "../service/TaskService";
import { useHomepage } from "./HomepageContext";
const TaskContext = createContext(null);

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const { user } = useUser();
  const { setError } = useError();
  const { getHomepage } = useHomepage();

  const getTasks = useCallback(async () => {
    if (!user?.userId) return;
    try {
      const res = await getTasksApi();
      setTasks(res);
    } catch (err) {
      setError(err.message);
    }
  }, [user, setError]);

  const getTaskById = async (taskId) => {
    if (!user?.userId) return;
    await getTaskByIdApi(taskId);
  };

  const addTask = async (task) => {
    try {
      if (!user?.userId) return;
      await addTaskApi(task);
      await getTasks();
      await getHomepage();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTask = async (task, taskId) => {
    try {
      if (!user?.userId) return;
      await updateTaskApi(task, taskId);
      await getTasks();
      await getHomepage();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      if (!user?.userId) return;
      await deleteTaskApi(taskId);
      await getTasks();
      await getHomepage();
    } catch (err) {
      setError(err.message);
    }
  };

  const completeTask = async (taskId) => {
    try {
      if (!user?.userId) return;
      await completeTaskApi(taskId);
      await getTasks();
      await getHomepage();
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
      value={{
        tasks,
        getTasks,
        getTaskById,
        addTask,
        updateTask,
        deleteTask,
        completeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
