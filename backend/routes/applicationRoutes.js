const express = require("express");
const router = express.Router();

const Application = require("../models/Application");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Submit Application
router.post("/", async (req, res) => {

  try {

    const application = new Application(req.body);

    const savedApplication =
      await application.save();

    res.status(201).json(savedApplication);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// Get All Applications (Admin)
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {

  try {

    const applications =
      await Application.find();

    res.json(applications);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// Get Student Applications By Email
router.get("/student/:email", async (req, res) => {

  try {

    const applications =
      await Application.find({
        email: req.params.email,
      });

    res.json(applications);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// Update Application Status
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {

  try {

    const application =
      await Application.findByIdAndUpdate(

        req.params.id,

        {
          status: req.body.status,
        },

        {
          new: true,
        }

      );

    if (!application) {

      return res.status(404).json({
        message: "Application not found",
      });

    }

    res.json(application);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// Delete Application
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {

  try {

    const application =
      await Application.findByIdAndDelete(
        req.params.id
      );

    if (!application) {

      return res.status(404).json({
        message: "Application not found",
      });

    }

    res.json({
      message: "Application Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;
