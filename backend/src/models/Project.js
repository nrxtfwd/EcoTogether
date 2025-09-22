import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    members: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Project = mongoose.model("Project", projectSchema)

export default Project