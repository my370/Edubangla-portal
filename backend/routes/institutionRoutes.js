const express = require("express");
const router = express.Router();

const Institution = require("../models/Institution");


// Get all institutions
router.get("/", async (req, res) => {

  try {

    const institutions = await Institution.find();

    res.json(institutions);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// Add institution
router.post("/", async (req, res) => {

  try {

    const institution = new Institution(
      req.body
    );

    const savedInstitution =
      await institution.save();

    res.status(201).json(
      savedInstitution
    );

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

});


// Update institution
router.put("/:id", async (req, res) => {

  try {

    const updatedInstitution =
      await Institution.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!updatedInstitution) {

      return res.status(404).json({
        message: "Institution not found"
      });

    }

    res.json(updatedInstitution);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// Delete institution
router.delete("/:id", async (req, res) => {

  try {

    const deletedInstitution =
      await Institution.findByIdAndDelete(
        req.params.id
      );

    if (!deletedInstitution) {

      return res.status(404).json({
        message: "Institution not found"
      });

    }

    res.json({

      message:
        "Institution deleted successfully",

      data:
        deletedInstitution

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message

    });

  }

});


module.exports = router;
