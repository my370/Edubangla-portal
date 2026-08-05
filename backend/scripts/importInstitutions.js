require("dotenv").config();

const mongoose = require("mongoose");
const Institution = require("../models/Institution");
const institutions = require("../data/institutions.json");


mongoose.connect(process.env.MONGODB_URI)
.then(async()=>{

  console.log("MongoDB Connected");


  for (const institution of institutions) {

    const exists = await Institution.findOne({
      name: institution.name
    });


    if (!exists) {

      await Institution.create(institution);

      console.log(
        "Added:",
        institution.name
      );

    } else {

      console.log(
        "Skipped:",
        institution.name
      );

    }

  }


  console.log(
    "Import Completed"
  );


  process.exit();


})
.catch(err=>{

 console.log(err);
 process.exit(1);

});
