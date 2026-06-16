import { createContext, useContext, useState } from "react";

const ErrorContext = createContext(null);

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const clearError = () => setError(null);

const setErrorSafe = (err) => {
  console.log("RAW TYPE:", typeof err);
  console.log("RAW VALUE:", err);
  setError(err);
};

  return (
    <ErrorContext.Provider value={{ error, setError: setErrorSafe, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};