import React, { useContext, useEffect, useState } from "react";
import Title from "../../components/admin/Title";
import Loading from "../../components/Loading";
import { completeDateFormat } from "../../lib/utils";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios, getToken } = useContext(AppContext);

  const getAllShows = async () => {
    try {
      const shows = await axios.get("/api/admin/upcoming-shows", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      setShows(shows.data.data);
    } catch (error) {
      console.log(error.message);
      toast.error("Unable to get show");
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllShows();
  }, []);

  return !loading ? (
    <>
      {shows.length > 0 ? (
        <>
          <Title text1={"List"} text2={"Shows"} />
          <div className=' max-w-4xl mt-6 overflow-x-auto'>
            <table className=' w-full border-collapse rounded-md overflow-hidden text-nowrap'>
              <thead>
                <tr className=' bg-primary/20 text-left text-white'>
                  <th className=' p-2 font-medium pl-5'>Movie Name</th>
                  <th className=' p-2 font-medium'>Showtime</th>
                  <th className=' p-2 font-medium'>Total Bookings</th>
                  <th className=' p-2 font-medium'>Earnings</th>
                </tr>
              </thead>
              <tbody className=' text-sm font-light'>
                {shows.map((show) => (
                  <tr
                    className=' border-b border-primary/10 bg-primary/5 even:bg-primary/10'
                    key={show._id}>
                    <td className=' p-2 min-w-45 pl-5'>{show.movieId.title}</td>
                    <td className=' p-2'>
                      {completeDateFormat(show.showDateTime)}
                    </td>
                    <td className=' p-2'>
                      {Object.keys(show.occupiedSeats).length}
                    </td>
                    <td className=' p-2 '>
                      {currency}{" "}
                      {Object.keys(show.occupiedSeats).length * show.showPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className=' flex flex-col items-center justify-center h-screen'>
          <h1 className=' text-3xl font-bold text-center'>No Shows</h1>
        </div>
      )}
    </>
  ) : (
    <Loading />
  );
};

export default ListShows;
