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
  const [user, setUser] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);

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

  const toggleFavorite = async (movieId) => {
    try {
      if (favoriteIds?.includes(movieId)) {
        setFavoriteIds(favoriteIds.filter((id) => id !== movieId));
        await axios.post("/api/user/remove-favorites", {
          movieId,
        });
        toast.error("Removed from favorites");
      } else {
        setFavoriteIds([...favoriteIds, movieId]);
        await axios.post("/api/user/add-favorites", {
          movieId,
        });
        toast.success("Favorites Updated");
      }
      await getUserData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    checkIsAdmin();
    getShows();
    if (user) {
      setFavoriteIds(user.favorites.map((favorite) => favorite._id));
    }
  }, [clerkUser]);

  const value = {
    axios,
    isAdmin,
    user,
    getUserData,
    upcomingShows,
    checkIsAdmin,
    toggleFavorite,
    favoriteIds,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext };
