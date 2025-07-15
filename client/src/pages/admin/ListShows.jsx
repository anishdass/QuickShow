import React, { useEffect, useState } from "react";
import { dummyDateTimeData, dummyShowsData } from "../../assets/assets";
import Title from "../../components/admin/Title";
import Loading from "../../components/Loading";
import { completeDateFormat, isoTimeFormat } from "../../lib/utils";

const ListShows = () => {
  // get currency
  const currency = import.meta.env.VITE_CURRENCY;

  // State variable for shows and loading
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  // getAllShows function
  const getAllShows = () => {
    setShows([
      {
        movie: dummyShowsData[0],
        showDateTime: dummyDateTimeData["2025-07-24"][0].time,
        showPrice: 59,
        occupiedSeats: {
          A1: "user_1",
          B1: "user_2",
          C1: "user_3",
        },
      },
    ]);
    setLoading(false);
  };

  // useEffect to getAllShows
  useEffect(() => {
    getAllShows();
  }, []);

  return !loading ? (
    <>
      {/* Title */}
      <Title text1={"List"} text2={"Shows"} />
      {/* Table */}
      <div className=' max-w-4xl mt-6 overflow-x-auto'>
        <table className=' w-full border-collapse rounded-md overflow-hidden text-nowrap'>
          <thead>
            <tr className=' bg-primary/20 text-left text-white'>
              <th className=' p-2 font-medium pl-5'>Movie Name</th>
              <th className=' p-2 font-medium'>Showtime</th>
              <th className=' p-2 font-medium'>Total shows</th>
              <th className=' p-2 font-medium'>Earnings</th>
            </tr>
          </thead>
          <tbody className=' text-sm font-light'>
            {shows.map((show) => (
              <tr
                className=' border-b border-primary/10 bg-primary/5 even:bg-primary/10'
                key={show._id}>
                <td className=' p-2 min-w-45 pl-5'>{show.movie.title}</td>
                <td className=' p-2'>
                  {completeDateFormat(isoTimeFormat(show.showDateTime))}
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
      {/* thead */}
      {/* tbody */}
    </>
  ) : (
    <Loading />
  );
};

export default ListShows;
