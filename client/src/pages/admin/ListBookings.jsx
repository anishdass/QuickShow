import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../../assets/assets";
import Title from "../../components/admin/Title";
import { completeDateFormat } from "../../lib/utils";
import Loading from "../../components/Loading";

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllBookings = () => {
    setBookings(dummyBookingData);
    setLoading(false);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return !loading ? (
    <>
      {/* Title */}
      <Title text1={"List"} text2={"Booking"} />
      {/* Table */}
      <div className=' max-w-4xl mt-6 overflow-x-auto'>
        <table className=' w-full border-collapse rounded-md overflow-hidden text-nowrap'>
          <thead>
            <tr className='bg-primary/20 text-left text-white'>
              <th className=' p-2 font-medium pl-5'>Username</th>
              <th className=' p-2 font-medium'>Movie Name</th>
              <th className=' p-2 font-medium'>Showtime</th>
              <th className=' p-2 font-medium'>Seats</th>
              <th className=' p-2 font-medium'>Amount</th>
            </tr>
          </thead>
          <tbody className=' text-sm font-light'>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className=' border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
                <td className=' p-2 min-w-45 pl-5'>{booking.user.name}</td>
                <td className='p-2'>{booking.show.movie.title}</td>
                <td className='p-2'>
                  {completeDateFormat(booking.show.showDateTime)}
                </td>
                <td className='p-2'>{booking.bookedSeats.join(", ")}</td>
                <td>
                  {currency} {bookings[0].bookedSeats.length * booking.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ListBookings;
