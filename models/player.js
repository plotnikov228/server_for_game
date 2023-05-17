import mongoose from "mongoose";

const Player = new mongoose.Schema(
    {
        user_id: {type: String, required: true},
        experience: {type: Number, required: true},
        level: {type: Number, required: true},
    }
)

export default mongoose.model('Player', Player)