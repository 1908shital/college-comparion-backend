const express = require("express");
const router = express.Router();
const {
    addCollege,
    getColleges,
    filterColleges,
} = require("../controllers/collegeController");

const { body } = require("express-validator");

router.post(
    "/add",
    [
        body("name").notEmpty().withMessage("College name required"),
        body("fees").isNumeric().withMessage("Fees must be number"),
        body("location").notEmpty().withMessage("Location required"),
        body("rating")
            .isFloat({ min: 1, max: 5 })
            .withMessage("Rating should be between 1 and 5"),
    ],
    addCollege,
);

router.get("/", getColleges);
router.get("/filter", filterColleges);

module.exports = router;
