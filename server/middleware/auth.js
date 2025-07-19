import { clerkClient } from "@clerk/express";

export const adminAuth = async (req, res, next) => {
  try {
    const { userId } = req.auth();
    console.log(userId);
    const user = await clerkClient.users.getUser(userId);
    if (user.privateMetadata.role !== "admin") {
      return res.json({ success: false, message: "Unauthorized" });
    }
    next();
  } catch (error) {}
  return res.json({ success: false, message: "Unexpected error happened" });
};
