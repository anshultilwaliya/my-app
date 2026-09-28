import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // req.body yahan raw Buffer hai (express.raw se), verify sync hota hai
    const payload = whook.verify(req.body.toString(), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = payload;

    switch (type) {
      case "user.created": {
        await User.create({
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: [data.first_name, data.last_name].filter(Boolean).join(" "),
          image: data.image_url,
          resume: "",
        });
        return res.json({});
      }
      case "user.updated": {
        await User.findByIdAndUpdate(data.id, {
          email: data.email_addresses[0].email_address,
          name: [data.first_name, data.last_name].filter(Boolean).join(" "),
          image: data.image_url,
        });
        return res.json({});
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.json({});
      }
      default:
        return res.json({});
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: "Webhooks Error" });
  }
};