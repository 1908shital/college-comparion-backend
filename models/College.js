const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        fees: {
            type: Number,
            required: true,
            min: 0,
        },
        location: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
            default: 3,
        },
    },
    {
        timestamps: true,
    }
);

collegeSchema.index({ name: "text", location: "text" });

module.exports = mongoose.model("College", collegeSchema);