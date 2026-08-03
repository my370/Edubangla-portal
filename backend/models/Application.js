const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    fatherName: {
      type: String,
    },

    motherName: {
      type: String,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    dob: {
      type: String,
    },

    gender: {
      type: String,
    },

    sscGpa: {
      type: String,
    },

    hscGpa: {
      type: String,
    },

    address: {
      type: String,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model(
  "Application",
  applicationSchema
);
