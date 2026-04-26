const College = require("../models/College");
const { validationResult } = require("express-validator");

// Add College
const addCollege = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        const { name, fees, location, rating } = req.body;

        const newCollege = new College({
            name,
            fees,
            location,
            rating,
        });

        const savedCollege = await newCollege.save();

        return res.status(201).json({
            success: true,
            data: savedCollege,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Colleges
const getColleges = async (req, res) => {
    try {
        const colleges = await College.find();

        return res.status(200).json({
            success: true,
            data: colleges,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Filter Colleges (IMPROVED)
const filterColleges = async (req, res) => {
    try {
        const { location, minRating, maxFees } = req.query;

        let query = {};

        if (location) {
            query.location = { $regex: location, $options: "i" }; // case-insensitive search
        }

        if (minRating) {
            query.rating = { ...query.rating, $gte: Number(minRating) };
        }

        if (maxFees) {
            query.fees = { ...query.fees, $lte: Number(maxFees) };
        }

        const colleges = await College.find(query);

        return res.status(200).json({
            success: true,
            count: colleges.length,
            data: colleges,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    addCollege,
    getColleges,
    filterColleges,
};
