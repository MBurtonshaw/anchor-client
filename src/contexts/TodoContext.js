import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useUser } from "../contexts/UserContext";
import { useError } from "../contexts/ErrorContext";
import {
  getTodosByUser,
  addTodo as addTodoApi,
  updateTodo as updateTodoApi,
  deleteTodo as deleteTodoApi,
  markFinished as markFinishedApi,
} from "../service/TodoService";
const TodoContext = createContext(null);

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const { user } = useUser();
  const { setError } = useError();

  const getTodos = useCallback(async () => {
    if (!user?.userId) {
      return;
    } else {
      try {
        const gettingTodos = await getTodosByUser();
        setTodos(gettingTodos);
      } catch (err) {
        setError(err.message);
      }
    }
  }, [user, setError]);

  const addTodo = async (todo) => {
    try {
      if (!user?.userId) return;
      console.log(todo);
      await addTodoApi(todo);
      await getTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTodo = async (todo, todoId) => {
    try {
      if (!user?.userId) return;
      await updateTodoApi(todo, todoId);
      await getTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      if (!user?.userId) return;
      await deleteTodoApi(todoId);
      await getTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  const markFinished = async (todoId) => {
    try {
      if (!user?.userId) return;
      await markFinishedApi(todoId);
      await getTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      getTodos();
    } else {
      setTodos([]);
    }
  }, [user, getTodos]);

  return (
    <TodoContext.Provider
      value={{ todos, getTodos, addTodo, updateTodo, deleteTodo, markFinished }}
    >
      {children}
    </TodoContext.Provider>
  );
};
