import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  education: [
    {
      institution: {
        type: String,
        required: true,
        trim: true,
      },
      degree: {
        type: String,
        trim: true,
      },
      fieldOfStudy: {
        type: String,
        trim: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
      },
      currentlyStudying: {
        type: Boolean,
        default: false,
      },
      grade: {
        type: String,
        trim: true,
      },
      activities: {
        type: String,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
    },
  ],

  certifications: [
    {
      name: String,
      issuingOrganization: String,
      issueDate: Date,
      expirationDate: Date,
      credentialUrl: String,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const EducationModel = mongoose.model("Education", EducationSchema);
