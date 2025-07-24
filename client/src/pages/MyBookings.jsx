import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../assets/assets";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import { completeDateFormat, timeFormat } from "../lib/utils";

const MyBookings = () => {
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(true);
  const currency = import.meta.env.VITE_CURRENCY;

  const getMyBookings = () => {
    setBookings(dummyBookingData);
    setLoading(false);
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  return !loading ? (
    <div className=' relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
      <BlurCircle top='100px' left='100px' />
      <div>
        <BlurCircle top='0px' left='600px' />
      </div>
      <h1 className=' text-lg font-semibold mb-4'>My Bookings</h1>
      {bookings.map((booking, index) => (
        // Booking Card
        <div
          key={index}
          className=' flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl'>
          {/* left side */}
          <div className=' flex flex-col md:flex-row'>
            {/* Poster */}
            <img
              src={booking.show.movie.poster_path}
              alt='poster'
              className=' md:max-w-45 aspect-video h-auto object-cover object-bottom rounded'
            />
            {/* Movie title */}
            <div className=' flex flex-col p-4'>
              <p className=' text-lg font-semibold'>
                {booking.show.movie.title}
              </p>
              {/* Runtime */}
              <p className=' text-gray-400 text-sm'>
                {timeFormat(booking.show.movie.runtime)}
              </p>
              {/* Show time */}
              <p className=' text-gray-400 text-sm mt-auto'>
                {completeDateFormat(booking.show.showDateTime)}
              </p>
            </div>
          </div>
          {/* Right side */}
          <div className=' flex flex-col md:items-end md:text-right justify-between p-4'>
            <div className=' flex items-center gap-4'>
              <p className=' text-2xl font-semibold mb-3'>
                {currency}
                {booking.amount}
              </p>
              {!booking.isPaid && (
                <button className=' bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer'>
                  Pay Now
                </button>
              )}
            </div>
            <div className=' text-sm'>
              <p>
                <span className=' text-gray-400'>Total Tickets: </span>
                {booking.bookedSeats.length}
              </p>
              <p>
                <span className=' text-gray-400'>Seat nos: </span>
                {booking.bookedSeats.join(", ")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Loading />
  );
};

export default MyBookings;
