const mongoose = require('mongoose');

// database schema of project
const projectSchema = new mongoose.Schema({
    creator: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: [true, "Please enter project title!"],
        trim: true
    },
    overview: {
        type: String,
        required: [true, "Please enter overview of your project."],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter decsription of your project."],
        trim: true
    },
    requirements: {
        type: String,
        required: [true, "Please enter requirements of your project."]
    },
    github: {
        type: String,
        required: [true, "Please enter github link of your project."]
    },
    hiringStatus: {
        type: Number,
        default: 0 // 0 -> open, 1 -> close
    },
    likes: {
        type: [String],
        default: [],
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Projects", projectSchema, 'tblProjects');