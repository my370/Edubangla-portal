const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    shortName: String,

    category: String,

    type: String,

    division: String,

    district: String,

    address: String,

    website: String,

    email: String,

    phone: String,

    logo: String,

    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Institution",
  institutionSchema
);
