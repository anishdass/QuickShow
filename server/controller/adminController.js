import {
  getBookings,
  getPaidBookings,
  getShows,
  getUsers,
} from "../utils/utilsDB.js";

// API to check if the router is admin
export const isAdmin = (req, res) => {
  return res.json({ success: true });
};

// API to getDashboard data
export const getDashboardData = async (req, res) => {
  try {
    const bookingData = await getPaidBookings();
    const totalBookings = bookingData?.length || 0;
    const totalRevenue =
      bookingData?.reduce(
        (total, bookingData) => total + bookingData.amount,
        0
      ) || 0;
    const activeShows = await getShows();
    const totalUsers = await getUsers();
    const dashboardData = {
      totalBookings: totalBookings,
      totalRevenue: totalRevenue,
      activeShows: activeShows,
      totalUsers: totalUsers,
    };
    return res.json({ success: true, data: dashboardData });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Error getting Dashboard Data",
    });
  }
};

// API to get all the upcoming shows from the database
export const getAllUpcomingShows = async (req, res) => {
  try {
    const upcomingShows = await getShows();
    return res.json({ success: true, data: upcomingShows });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, data: error.message });
  }
};

// API to getAllBookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await getBookings();
    console.log(bookings);
    return res.json({ success: true, data: bookings });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: "Error getting bookings" });
  }
};
