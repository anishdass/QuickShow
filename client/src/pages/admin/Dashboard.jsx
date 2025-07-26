import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import BlurCircle from "../../components/BlurCircle";
import { completeDateFormat } from "../../lib/utils";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const currency = (import.meta.env.VITE_CURRENCY = "£");
  const { axios } = useContext(AppContext);

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUsers: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData?.totalBookings,
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: dashboardData?.totalRevenue,
      icon: CircleDollarSignIcon,
    },
    {
      title: "Active Shows",
      value: dashboardData?.activeShows.length,
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashboardData?.totalUsers,
      icon: UsersIcon,
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const dashboardData = await axios.get("/api/admin/dashboard");
      setDashboardData(dashboardData.data.data);
    } catch (error) {
      console.log(error.message);
      toast.error("Unable to fetch dashboard data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  console.log(dashboardData);

  return !loading ? (
    <>
      <Title text1={"Admin"} text2={"Dashboard"} />
      <div className=' relative flex flex-wrap gap-4 mt-6'>
        <BlurCircle top='-100px' left='0px' />
        <div className=' flex flex-wrap gap-4 w-full'>
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className=' flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full'>
              <div>
                <h1 className=' text-sm'>{card.title}</h1>
                <p className=' text-xl font-medium mt-1'>{card.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className=' mt-10 text-lg font-medium'>Active Shows</p>
      <div className=' relative flex flex-wrap gap-6 mt-4 max-w-5xl'>
        <BlurCircle top='100px' left='-10%' />
        {dashboardData.activeShows.map((show) => (
          <div
            className=' w-55 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300'
            key={show._id}>
            {/* Poster */}
            <img
              className=' w-full object-cover'
              src={`https://image.tmdb.org/t/p/original${show.movieId.poster_path}`}
              alt='poster'
            />

            {/* Title */}
            <p className=' font-medium p-2 truncate'>{show.movieId.title}</p>

            {/* Price and rating */}
            <div className=' flex items-center justify-between px-2'>
              <p className=' text-lg font-medium'>
                {currency} {show.showPrice}
              </p>
              <p className=' flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
                <StarIcon className=' w-4 h-4 text-primary fill-primary' />
                {show.movieId.vote_average.toFixed(1)}
              </p>
            </div>

            {/* Showdate */}
            <p className=' px-2 pt-2 text-sm text-gray-500'>
              {completeDateFormat(show.showDateTime)}
            </p>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Dashboard;
