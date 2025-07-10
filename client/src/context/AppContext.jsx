import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Load favorites from localStorage once
  useEffect(() => {
    const stored = localStorage.getItem("favoriteMovies");
    if (stored) {
      setFavoriteMovies(JSON.parse(stored));
    }
  }, []);

  // Save favorites to localStorage on change
  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  const toggleFavorite = (movie) => {
    const exists = favoriteMovies.some((fav) => fav._id === movie._id);
    if (exists) {
      setFavoriteMovies((prev) => prev.filter((fav) => fav._id !== movie._id));
    } else {
      setFavoriteMovies((prev) => [...prev, movie]);
    }
  };

  const isFavorited = (movie) => {
    return favoriteMovies.some((fav) => fav._id === movie._id);
  };

  const value = {
    favoriteMovies,
    setFavoriteMovies,
    toggleFavorite,
    isFavorited,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};