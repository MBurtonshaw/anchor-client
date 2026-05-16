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

  const { user } = useUser();
  const { setError } = useError();

const getHomepage = useCallback(async () => {
  if (!user?.userId) return;
  try {
    const res = await getHomepageApi();
    setHomepage(res); 
  } catch (err) {
    setError(err.message);
  }
}, [user, setError]);

  useEffect(() => {
    if (user) {
      getHomepage();
    } else {
      setHomepage([]);
    }
  }, [user, getHomepage]);

  return (
    <HomepageContext.Provider
      value={{ homepage, getHomepage }}
    >
      {children}
    </HomepageContext.Provider>
  );
};
