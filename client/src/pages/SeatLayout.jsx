import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import { dateFormat, isoTimeFormat } from "../lib/utils";
import { ClockIcon } from "lucide-react";

const SeatLayout = () => {
  const { id, dateString } = useParams();

  const date = dateFormat(dateString);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [show, setShow] = useState(null);

  const navigate = useNavigate();

  const toggleSelectedTime = (time) => {
    if (selectedTime === time) {
      setSelectedTime("");
    } else {
      setSelectedTime(time);
    }
  };

  const getShow = () => {
    const movie = dummyShowsData.find((movie) => movie._id === id);
    if (movie) {
      setShow({
        movie,
        dateTime: dummyDateTimeData,
      });
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  if (show) {
    console.log(selectedTime);
    console.log(show.dateTime["2025-07-24"][0].time);
  }

  return show ? (
    <div className=' flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
      {/* Available timings */}
      <div className=' w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
        <p className=' text-lg font-semibold px-6'>Available timings</p>
        <div className=' mt-5 space-y-1'>
          {show.dateTime[date].map((data) => (
            <div
              // onClick={() => setSelectedTime(data.time)}
              onClick={() => toggleSelectedTime(data.time)}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
                selectedTime === data.time
                  ? "bg-primary text-white"
                  : "hover:bg-primary/20"
              }`}
              key={data.showId}>
              <ClockIcon className=' w-4 h-4' />
              <p className=' text-sm'>{isoTimeFormat(data.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seat Layout */}
      <div></div>
    </div>
  ) : (
    <Loading />
  );
};

export default SeatLayout;
