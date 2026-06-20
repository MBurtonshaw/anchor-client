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
  getHomepage as getHomepageApi
} from "../service/HomepageService";
const HomepageContext = createContext(null);

export const useHomepage = () => useContext(HomepageContext);

export const HomepageProvider = ({ children }) => {
const [homepage, setHomepage] = useState(null);
const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const { setError } = useError();

const getHomepage = useCallback(async () => {
  try {
    const res = await getHomepageApi();
    setHomepage(res);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}, [setError]);

useEffect(() => {
  if (!user?.userId) {
    setHomepage(null);
    setLoading(false);
    return;
  }

  getHomepage();
}, [user?.userId, getHomepage]);

  return (
    <HomepageContext.Provider
      value={{ homepage, getHomepage, setHomepage, loading }}
    >
      {children}
    </HomepageContext.Provider>
  );
};
