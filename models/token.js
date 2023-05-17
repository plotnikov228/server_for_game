import mongoose from "mongoose";

const Token = new mongoose.Schema(
    {
        user_id: {type: String, required: true}
    }
)

export default mongoose.model('Token', Token)