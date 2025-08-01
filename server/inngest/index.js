import { Inngest } from "inngest";
import { sendEmail } from "../config/nodemailer.js";
import {
  createUser,
  deleteBooking,
  findUserByIdAndDelete,
  findUserByIdAndUpdate,
  getAllUsers,
  populatedShows,
} from "../utils/utilsDB.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Function to save user data to the database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },

  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await createUser(userData);
  }
);

// Function to delete user from database
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },

  async ({ event }) => {
    const { id } = event.data;

    await findUserByIdAndDelete(id);
  }
);

// Function to update user from database
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },

  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await findUserByIdAndUpdate(id, userData);
  }
);

// Function to update user from database
const releaseSeatsAndDeleteBooking = inngest.createFunction(
  { id: "release-seats-delete-booking" },
  { event: "app/check-payment" },

  async ({ event, step }) => {
    const tenMinutesLater = new Date(Date.now() + 10 * 60 * 1000);
    await step.sleepUntil("wait-for-10-minutes", tenMinutesLater);

    await step.run("check-payment-status", async () => {
      const bookingId = event.data.bookingId;
      const booking = getBookingsById(bookingId);
      if (!booking.isPaid) {
        const show = findShowsById(booking.show);
        booking.bookedSeat.forEach((seat) => delete show.occupiedSeats[seat]);
        show.markModified("occupiedSeats");
        await show.save();
        await deleteBooking(booking._id);
      }
    });
  }
);

// Function to send mail to the user after ticket confirmation.
const sendBookingConfirmationEmail = inngest.createFunction(
  { id: "send-booking-confirmation-email" },
  { event: "app/show.booked" },

  async ({ event }) => {
    const { bookingId } = event.data;
    const booking = await getPopulatedBooking(bookingId);

    const emailData = {
      to: booking.user.email,
      subject: `Payment Confirmation: ${booking.show.movieId.title} booked!`,
      body: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; font-size: 16px; color: #333;">
        <h2 style="color: #222;">Hi ${booking.user.name},</h2>

        <p>
          Your booking for
          <strong style="color: #F84565;">"${
            booking.show.movieId.title
          }"</strong>
          is confirmed.
        </p>

        <p>
          <strong>Date:</strong>
          ${new Date(booking.show.showDateTime).toLocaleDateString("en-US", {
            timeZone: "Asia/Kolkata",
          })}<br/>
          <strong>Time:</strong>
          ${new Date(booking.show.showDateTime).toLocaleTimeString("en-US", {
            timeZone: "Asia/Kolkata",
          })}
        </p>

        <p style="margin-top: 20px;">
          Enjoy the show! 🍿
        </p>

        <p style="font-size: 14px; color: #555;">
          Thanks for booking with us!<br/>
          — <strong>QuickShow Team</strong>
        </p>
      </div>
    `,
    };
    await sendEmail(emailData);
  }
);

// Inngest function to send reminders
const sendShowReminders = inngest.createFunction(
  { id: "send-show-reminders" },
  { cron: "0 */8 * * *" },
  async ({ step }) => {
    const now = new Date();
    const in8Hours = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    const windowStart = new Date(in8Hours.getTime() - 10 * 60 * 1000);

    // Prepare reminder tasks
    const reminderTasks = await step.run("prepare-reminder-tasks", async () => {
      const shows = await populatedShows(windowStart, in8Hours);

      const tasks = [];

      for (const show of shows) {
        if (!show.movieId || !show.occupiedSeats) continue;
        const userIds = [...new set(Object.values(show.occupiedSeats))];
        if (userIds.length === 0) continue;
        const users = await findUserInUserIds(userIds);
        for (const user of users) {
          tasks.push({
            userEmail: user.email,
            userName: user.name,
            movieTitle: show.movie.title,
            showTime: show.showDateTime,
          });
        }
      }
      return tasks;
    });
    if (reminderTasks.length === 0)
      return { sent: 0, message: "No reminders to send" };

    // Send reminder emails
    const results = await step.run("send-all-reminders", async () => {
      return await Promise.allSettled(
        reminderTasks.map((task) =>
          sendEmail({
            to: task.userEmail,
            subject: `Your movie ${task.movieTitle} starts soon!`,
            body: `<div style='font-family: Arial, sans-serif; padding: 20px;'>
                <h2>Hello ${task.userName}</h2>
                <p>This is a quick reminder that your movie:</p>
                <h3 style='color:#F84565'>${task.movieTitle}</h3>
                <p>
                  is scheduled for{" "}
                  <strong>
                    ${new Date(task.showTime).toLocaleDateString("en-US", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </strong>{" "}
                  at
                  <strong>
                    ${new Date(task.showTime).toLocaleTimeString("en-US", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </strong>
                  .
                </p>
                <p>
                  It starts in approximately <strong>8 hours</strong> - make
                  sure you're ready!
                </p>
                <br />
                <p>
                  Enjoy the show!
                  <br />
                  QuickShow Team
                </p>
              </div>`,
          })
        )
      );
    });
    const sent = results.filter((r) => r.filter === "fulfilled").length;
    const failed = results.length - sent;
    return {
      sent,
      failed,
      message: `Sent ${sent} reminder(s), ${failed} failed`,
    };
  }
);

// Inngest function to send notifications when new show is added
const sendNewShowNotifications = inngest.createFunction(
  { id: "send-new-show-notification" },
  { event: "app/shows.added" },
  async ({ event }) => {
    const { movieTitle } = event.data;

    const users = await getAllUsers();

    for (const user of users) {
      const userEmail = user.email;
      const userName = user.name;
      const subject = `New shows added: ${movieTitle}`;
      const body = `<div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Hi ${userName},</h2>
                    <p>We've just added a new show to our library:</p>
                    <h3 style="color: #F84565;">"${movieTitle}"</h3>
                    <p>Visit our website</p>
                    <br/>
                    <p>Thanks,<br/>QuickShow Team</p>
                    </div>`;

      await sendEmail({
        to: userEmail,
        subject,
        body,
      });
    }
    return { message: "Notifications sent!" };
  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
  releaseSeatsAndDeleteBooking,
  sendBookingConfirmationEmail,
  sendShowReminders,
  sendNewShowNotifications,
];
