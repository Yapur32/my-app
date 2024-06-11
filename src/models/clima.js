import mongoose from "mongoose";

const climaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    temp: {
        type: Number,
        required: true
    },
    temp_max: {
        type: Number,
        required: true
    },
    temp_min: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.clima || mongoose.model('clima', climaSchema)