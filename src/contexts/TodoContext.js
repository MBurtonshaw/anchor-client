import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { getTodosByUser } from "../service/TodoService";
import { useUser } from "../contexts/UserContext";
const TodoContext = createContext(null);

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const { user } = useUser();

  const getTodos = useCallback(async () => {
    if (!user) {
      return;
    } else {
      try {
        const gettingTodos = await getTodosByUser(user.id);
        setTodos(gettingTodos);
      } catch (err) {
        console.error(err);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getTodos();
    } else {
      setTodos([]);
    }
  }, [user, getTodos]);

  return (
    <TodoContext.Provider value={{ todos, getTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
