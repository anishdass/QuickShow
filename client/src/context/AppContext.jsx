import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

// Axios defaults
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// __define-ocg__ context
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const { user: clerkUser } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isAdmin, setIsAdmin] = useState(false);
  const [upcomingShows, setUpcomingShows] = useState([]);
  const [user, setUser] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const tmdb_img_url = "https://image.tmdb.org/t/p/original";

  const getUserData = async () => {
    try {
      const { data } = await axios.post(
        "/api/user/get-user",
        {
          userId: clerkUser?.id,
        },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      data.success ? setUser(data.data) : toast.error(data.message);
    } catch (error) {
      toast("Something went wrong.");
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
      toast("Something went wrong..");
      console.log(error.message);
    }
  };

  const getShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      data.success ? setUpcomingShows(data.data) : toast.error(data.message);
    } catch (error) {
      toast("Something went wrong..");
      console.log(error.message);
    }
  };

  const toggleFavorite = async (movieId) => {
    try {
      if (favoriteIds.includes(movieId)) {
        await axios.post(
          "/api/user/remove-favorites",
          { movieId },
          { headers: { Authorization: `Bearer ${await getToken()}` } }
        );
        setFavoriteIds(favoriteIds.filter((id) => id !== movieId));
        toast.error("Removed from favorites");
      } else {
        await axios.post(
          "/api/user/add-favorites",
          { movieId },
          { headers: { Authorization: `Bearer ${await getToken()}` } }
        );
        setFavoriteIds([...favoriteIds, movieId]);
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
  }, [clerkUser]);

  useEffect(() => {
    if (user) {
      setFavoriteIds(user.favorites.map((f) => f._id));
    }
  }, [user]);

  const value = {
    axios,
    isAdmin,
    user,
    getUserData,
    upcomingShows,
    checkIsAdmin,
    toggleFavorite,
    favoriteIds,
    tmdb_img_url,
    getToken,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
