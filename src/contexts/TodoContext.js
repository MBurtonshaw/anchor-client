import { createContext, useState, useContext } from 'react';

const TodoContext = createContext(null);

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
    const [ todos, setTodos ] = useState([
        {
            id : 1,
            userId : 1,
            title : "Mow Lawn",
            priority : 2,
            dueDate : "2026-01-05",
            notes : "",
            urgencyScore : 1.1,
            finished : false,
            createdAt : "2026-01-01T10:00:00"
        },
        {
            id : 2,
            userId : 1,
            title : "Pay Bills",
            priority : 3,
            dueDate : "2026-01-15",
            notes : "Gas, Electric",
            urgencyScore : 3.2,
            finished : false,
            createdAt : "2026-01-01T10:00:00"
        },
        {
            id : 3,
            userId : 1,
            title : "Go to Therapy",
            priority : 5,
            dueDate : "2026-01-09",
            notes : "",
            urgencyScore : 6.7,
            finished : false,
            createdAt : "2026-01-01T10:00:00"
        }
    ]);



    return(
        <TodoContext.Provider value={{ todos }}>
            {children}
        </TodoContext.Provider>
    );

}