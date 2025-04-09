import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
const socialMediaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    socialLinks: [
      {
        platform: {
          type: String,
          enum: [
            "Facebook",
            "Instagram",
            "Twitter",
            "LinkedIn",
            "YouTube",
            "GitHub",
            "Website",
            "WhatsApp",
            "Telegram",
            "Pinterest",
            "Dribbble",
          ],
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

//Export the model
const SocialMediaModel = mongoose.model("SocialMedia", socialMediaSchema);

export default SocialMediaModel;
