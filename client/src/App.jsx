import React from "react";
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

const App = () => {
  const isAdmin = useLocation().pathname.startsWith("/admin");

  return (
    <>
      <Toaster />
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/movies/:id/:dateString' element={<SeatLayout />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/admin/*' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='add-shows' element={<AddShows />} />
          <Route path='list-bookings' element={<ListBookings />} />
          <Route path='list-shows' element={<ListShows />} />
        </Route>
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
};

export default App;
