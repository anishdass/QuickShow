import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  let clerkUser = useUser().user;

  let { getToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isAdmin, setIsAdmin] = useState(false);
  const [upcomingShows, setUpcomingShows] = useState([]);
  const [user, setUser] = useState(false);

  const getUserData = async () => {
    try {
      const { data } = await axios.post("/api/user/get-user", {
        userId: clerkUser?.id,
      });
      data.success ? setUser(data.data) : toast.error(data.message);
    } catch (error) {
      toast.message("Something went wrong..");
      console.log(error.message);
    }
  };

  const checkIsAdmin = async () => {
    try {
      if (clerkUser) {
        const { data } = await axios.get("/api/admin/is-admin", {
          headers: { Authorization: `Bearer ${await getToken()}` },
        });
        setIsAdmin(data.success);

        if (!data.success && location.pathname.startsWith("/admin")) {
          toast.error("Unauthorized to access admin paths");
          navigate("/");
        }
      }
    } catch (error) {
      toast.message("Something went wrong..");
      console.log(error.message);
    }
  };

  const getShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");
      data.success ? setUpcomingShows(data.data) : toast.error(data.message);
    } catch (error) {
      toast.message("Something went wrong..");
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserData();
    checkIsAdmin();
    getShows();
  }, [clerkUser]);

  const value = { axios, isAdmin, user, upcomingShows, checkIsAdmin };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext };
