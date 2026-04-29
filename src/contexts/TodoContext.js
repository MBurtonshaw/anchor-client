import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useUser } from "../contexts/UserContext";
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

  const getTodos = useCallback(async () => {
    if (!user?.userId) {
      return;
    } else {
      try {
        console.log(user);
        const gettingTodos = await getTodosByUser(user.userId);
        setTodos(gettingTodos);
      } catch (err) {
        console.error(err);
      }
    }
  }, [user]);

  const addTodo = async (todo) => {
    try {
      if (!user?.userId) return;
      await addTodoApi(user.userId, todo);
      await getTodos();
    } catch (e) {
      console.log(e);
    }
  };

  const updateTodo = async (todo) => {
    try {
      if (!user?.userId) return;
      await updateTodoApi(user.userId, todo);
      await getTodos();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      if (!user?.userId) return;
      await deleteTodoApi(user.userId, todoId);
      await getTodos();
    } catch (e) {
      console.log(e);
    }
  };

  const markFinished = async (todoId) => {
    try {
      if (!user?.userId) return;
      await markFinishedApi(user.userId, todoId);
      await getTodos();
    } catch (e) {
      console.log(e);
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
