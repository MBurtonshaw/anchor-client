import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useUser } from "./UserContext";
import { useError } from "./ErrorContext";
import handleError from "../components/utils/HandleError";
import {
  getTasks as getTasksApi,
  getTaskById as getTaskByIdApi,
  createTask as createTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
  completeTask as completeTaskApi,
} from "../service/TaskService";
const TaskContext = createContext(null);

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const { setError } = useError();

  const getTasks = useCallback(async () => {
    if (!user?.userId) {
      setTasks([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await getTasksApi();
      setTasks(res);
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  }, [user, setError]);

const getTaskById = async (taskId) => {
  if (!user?.userId) {
    setTasks([]);
    return;
  }
  setLoading(true);
  try {
    const task = await getTaskByIdApi(taskId);
    return task;
  } catch (err) {
    handleError(err, setError);
    return null;
  } finally {
    setLoading(false);
  }
};

  const createTask = async (task) => {
    if (!user?.userId) {
      setTasks([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      await createTaskApi(task);
      await getTasks();
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (task, taskId) => {
    if (!user?.userId) {
      setTasks([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      await updateTaskApi(task, taskId);
      await getTasks();
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    if (!user?.userId) {
      setTasks([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      await deleteTaskApi(taskId);
      await getTasks();
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  const completeTask = async (taskId) => {
    if (!user?.userId) {
      setTasks([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      await completeTaskApi(taskId);
      await getTasks();
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
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
        createTask,
        updateTask,
        deleteTask,
        completeTask,
        loading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
