import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import MyBookings from "./pages/MyBookings";
import Movies from "./sections/Home/Movies";
import SeatLayout from "./pages/SeatLayout";
import Favorite from "./pages/Favorite";
import { Toaster } from "react-hot-toast";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddShows from "./pages/admin/AddShows";
import ListBookings from "./pages/admin/ListBookings";
import ListShows from "./pages/admin/ListShows";
import { AppContext } from "./context/AppContext";
import { SignIn } from "@clerk/clerk-react";
import Loading from "./components/Loading";

const App = () => {
  const isAdminPath = useLocation().pathname.startsWith("/admin");
  const { user } = useContext(AppContext);

  const [loading, setLoading] = useState(true); // <--- 1. Loading state

  useEffect(() => {
    // 2-second delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout); // cleanup
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Toaster />
      {!isAdminPath && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/show/:id' element={<MovieDetails />} />
        <Route path='/show/:id/:dateString' element={<SeatLayout />} />
        <Route path='/loading/:nextUrl' element={<Loading />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route
          path='/admin/*'
          element={
            user ? (
              <Layout />
            ) : (
              <div className='min-h-screen flex justify-center items-center'>
                <SignIn fallbackRedirectUrl={"/admin"} />
              </div>
            )
          }>
          <Route index element={<Dashboard />} />
          <Route path='add-shows' element={<AddShows />} />
          <Route path='list-bookings' element={<ListBookings />} />
          <Route path='list-shows' element={<ListShows />} />
        </Route>
      </Routes>
      {!isAdminPath && <Footer />}
    </>
  );
};

export default App;
