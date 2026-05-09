import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },
    ctc: {
      type: Number,
      required: true,

    },
    year: {
      type: Number,
      required: true,
    },

    formLink: {
      type: String,
      required: true,
    },
    course: [
      {
        type: String,
        required: true,
      },
    ],
    eligibleBranches: [
      {
        type: String,
        required: true,
      },
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);