import User from "../models/User.js";

const checkSubscription = async (req, res, next) => {
  try {
    const userId = req.body.userId || req.params.userId;
    if (!userId) return res.status(400).json({ message: "Missing user ID" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Check if subscription is valid
    const isActiveSub =
      user.isSubscribed && user.subscriptionExpiresAt > new Date();

    if (user.hostedEventCount >= 2 && !isActiveSub) {
      return res.status(403).json({
        message: "You have reached the free event limit. Please subscribe.",
      });
    }

    // ✅ Pass user to next step
    req.userData = user;
    next();
  } catch (err) {
    console.error("Subscription check failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export default checkSubscription;
