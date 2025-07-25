import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loading from "../components/Loading";
import { dateFormat, isoTimeFormat } from "../lib/utils";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import BlurCircle from "../components/BlurCircle";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const SeatLayout = () => {
  const { id, dateString } = useParams();
  const { axios } = useContext(AppContext);
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];

  const date = dateFormat(dateString);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [show, setShow] = useState(null);
  const [showId, setShowId] = useState("");
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  const selectedDate = selectedTime.split("T")[0];

  const navigate = useNavigate();

  const toggleSelectedTime = (time) => {
    if (selectedTime === time) {
      setSelectedTime("");
    } else {
      setSelectedTime(time);
    }
  };

  const getShow = async () => {
    const data = await axios.get(`/api/show/${id}`);
    const movie = data.data.data;
    const dateTime = data.data.dateTime;
    if (data) {
      setShow({
        movie,
        dateTime,
      });
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) return toast("Please select the time");

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast("You can only select 5 seats");
    }

    if (occupiedSeats.includes(seatId)) {
      return toast("This seat is already booked");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className='flex gap-2 mt-2'>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${
                selectedSeats.includes(seatId) ? "bg-primary text-white" : ""
              } ${
                occupiedSeats.includes(seatId) ? "bg-gray-600 text-white" : ""
              }`}>
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  const reserveSeats = async () => {
    try {
      const payload = { selectedSeats, showId };
      await axios.post("/api/booking/create-booking", payload);
    } catch (error) {
      console.log(error.message);
      toast.error("Unable to reserve seats");
    }
  };

  const getBookedSeats = async () => {
    if (showId) {
      try {
        const { data } = await axios.get(`/api/booking/seats/${showId}`);
        setOccupiedSeats(data.data);
      } catch (error) {
        console.log(error.message);
        toast.error("Unable to fetch booked seats");
      }
    }
  };

  useEffect(() => {
    if (show && selectedDate && show.dateTime[selectedDate]) {
      setShowId(show.dateTime[selectedDate][0].showId);
    }
  }, [selectedDate, show]);

  useEffect(() => {
    getShow();
    getBookedSeats();
  }, [id, showId]);

  return show ? (
    <div className=' flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
      {/* Available timings */}
      <div className=' w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
        <p className=' text-lg font-semibold px-6'>Available timings</p>
        <div className=' mt-5 space-y-1'>
          {show.dateTime[date].map((data) => (
            <div
              onClick={() => toggleSelectedTime(data.time)}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
                selectedTime === data.time
                  ? "bg-primary text-white"
                  : "hover:bg-primary/20"
              }`}
              key={data.showId}>
              <ClockIcon className=' w-4 h-4' />
              <p className=' text-sm'>
                {isoTimeFormat(data.time).split(",")[1]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Seat Layout */}
      <div className=' relative flex-1 flex flex-col items-center max-md:mt-16'>
        <BlurCircle top='-100px' left='-100px' />
        <BlurCircle bottom='0' right='0' />
        <h1 className=' text-2xl font-semibold mb-4'>Select your seat</h1>
        <img src={assets.screenImage} alt='screen' />
        <p className=' text-gray-400 text-sm mb-6'>Screen</p>
        <div className=' flex flex-col items-center mt-10 text-xs text-gray-300'>
          <div className=' grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
            {groupRows[0].map((row) => renderSeats(row))}
          </div>
          <div className=' grid grid-cols-2 gap-11'>
            {groupRows.slice(1).map((group, index) => (
              <div key={index}>{group.map((row) => renderSeats(row))}</div>
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            reserveSeats();
            navigate("/my-bookings");
          }}
          className=' flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95'>
          Proceed to checkout
          <ArrowRightIcon strokeWidth={3} className=' w-4 h-4' />
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SeatLayout;
