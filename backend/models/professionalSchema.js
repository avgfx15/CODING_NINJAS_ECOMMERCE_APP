import mongoose from "mongoose";

const ProfessionalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  experiences: [
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      company: {
        type: String,
        required: true,
        trim: true,
      },
      location: {
        type: String,
        trim: true,
      },
      employmentType: {
        type: String,
        enum: [
          "Full-time",
          "Part-time",
          "Internship",
          "Freelance",
          "Contract",
          "Remote",
          "Temporary",
        ],
        default: "Full-time",
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
      },
      currentlyWorking: {
        type: Boolean,
        default: false,
      },
      responsibilities: {
        type: String,
        trim: true,
      },
      technologiesUsed: {
        type: [String], // e.g., ['React', 'Node.js', 'MongoDB']
        default: [],
      },
    },
  ],

  skills: [
    {
      name: String,
      level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      },
    },
  ],

  languages: [
    {
      name: String,
      proficiency: {
        type: String,
        enum: ["Basic", "Conversational", "Fluent", "Native"],
      },
    },
  ],

  achievements: {
    type: [String], // e.g., ["Reduced loading time by 40%", "Led a team of 5 developers"]
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProfessionalModel = mongoose.model("Professional", ProfessionalSchema);
export default ProfessionalModel;
