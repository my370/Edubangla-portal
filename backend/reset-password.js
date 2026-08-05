require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const hash = await bcrypt.hash("Admin123@", 10);

    const result = await User.updateOne(
      { email: "whatevermd195@gmail.com" },
      { $set: { password: hash } }
    );

    console.log("Password reset successful.");
    console.log(result);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

resetPassword();
