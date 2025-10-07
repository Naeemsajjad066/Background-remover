import { Webhook } from "svix";
import userModel from "../models/userModel.js";

// Clerk Webhook Controller
const clerkWebhooks = async (req, res) => {
  console.log("=== Clerk Webhook Triggered ===");

  try {
    // Clerk requires the *raw body* (Buffer) for verification
    const payload = req.body.toString("utf8");
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify webhook signature
    const event = wh.verify(payload, headers);
    const { type, data } = event;

    console.log("Event type:", type);

    switch (type) {
      case "user.created": {
        console.log("Processing user.created event...");

        const userData = {
          clerkId: data.id,
          email: data.email_addresses?.[0]?.email_address || "",
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          photo: data.image_url || "",
        };

        console.log("User data to save:", userData);

        // Prevent duplicate entries if webhook retries
        const existingUser = await userModel.findOne({ clerkId: data.id });
        if (existingUser) {
          console.log("User already exists. Skipping creation.");
          return res.status(200).json({ success: true, message: "User already exists" });
        }

        const savedUser = await userModel.create(userData);
        console.log("✅ User saved successfully:", savedUser);
        console.log("✅ User ID:", savedUser._id);

        return res.status(201).json({ success: true, message: "User created" });
      }

      case "user.updated": {
        console.log("Processing user.updated event...");

        const updateData = {
          email: data.email_addresses?.[0]?.email_address || "",
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          photo: data.image_url || "",
        };

        const updatedUser = await userModel.findOneAndUpdate(
          { clerkId: data.id },
          updateData,
          { new: true }
        );

        if (!updatedUser) {
          console.log("User not found during update.");
          return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log("✅ User updated successfully:", updatedUser._id);
        return res.status(200).json({ success: true, message: "User updated" });
      }

      case "user.deleted": {
        console.log("Processing user.deleted event...");

        const deletedUser = await userModel.findOneAndDelete({ clerkId: data.id });
        if (!deletedUser) {
          console.log("User not found during deletion.");
          return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log("✅ User deleted successfully:", deletedUser._id);
        return res.status(200).json({ success: true, message: "User deleted" });
      }

      default:
        console.log("Unhandled event type:", type);
        return res.status(200).json({ success: true, message: "Unhandled event type" });
    }
  } catch (err) {
    console.error("=== WEBHOOK ERROR ===");
    console.error("Message:", err.message);
    res.status(400).json({ success: false, message: "Invalid or unverified webhook" });
  }
};


const userCredits=async (req,res)=>{
try {

  const {clerkId}=req.body
  
  if (!clerkId) {
    return res.json({success:false, message:"ClerkId is required"})
  }
  
  const userData=await userModel.findOne({clerkId})
  
  if (!userData) {
    return res.json({success:false, message:"User not found"})
  }
  
  res.json({success:true, credits:userData.creditBalance})


} catch (error) {
  console.log(error.message)
  res.json({success:false,message:error.message})
}
}

export { clerkWebhooks,userCredits };
