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
  getAppointments as getAppointmentsApi,
  getAppointmentById as getAppointmentByIdApi,
  createAppointment as createAppointmentApi,
  updateAppointment as updateAppointmentApi,
  deleteAppointment as deleteAppointmentApi,
  completeAppointment as completeAppointmentApi
} from "../service/AppointmentService";
const AppointmentContext = createContext(null);

export const useAppointment = () => useContext(AppointmentContext);

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const { setError } = useError();

  const getAppointments = useCallback(async () => {
    if (!user?.userId) {
      setAppointments([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await getAppointmentsApi();
      setAppointments(res);
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  }, [user, setError]);

const getAppointmentById = async (appointmentId) => {
  if (!user?.userId) {
    setAppointments([]);
    return;
  }
  setLoading(true);
  try {
    const appointment = await getAppointmentByIdApi(appointmentId);
    return appointment;
  } catch (err) {
    handleError(err, setError);
    return null;
  } finally {
    setLoading(false);
  }
};

  const createAppointment = async (appointment) => {
    if (!user?.userId) {
      setAppointments([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      await createAppointmentApi(appointment);
      await getAppointments();
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointment = async (appointment, appointmentId) => {
    if (!user?.userId) {
      setAppointments([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      await updateAppointmentApi(appointment, appointmentId);
      await getAppointments();
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    if (!user?.userId) {
      setAppointments([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      await deleteAppointmentApi(appointmentId);
      await getAppointments();
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  const completeAppointment = async (appointmentId) => {
    if (!user?.userId) {
      setAppointments([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      await completeAppointmentApi(appointmentId);
      await getAppointments();
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getAppointments();
    } else {
      setAppointments([]);
    }
  }, [user, getAppointments]);

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        getAppointments,
        getAppointmentById,
        createAppointment,
        updateAppointment,
        deleteAppointment,
        completeAppointment,
        loading,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
