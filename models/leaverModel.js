const mongoose = require("mongoose");

const leaveSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    day: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    numberday: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
   
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    },
   
  },
  {
    timestamps: true,
  }
);

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;
