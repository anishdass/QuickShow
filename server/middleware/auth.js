import { clerkClient } from "@clerk/express";

export const adminAuth = async (req, res, next) => {
  try {
    const { userId } = req.auth();
    const user = await clerkClient.users.getUser(userId);
    if (user.privateMetadata.role !== "admin") {
      return res.json({ success: false, message: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: "Unable to authorize" });
  }
};
