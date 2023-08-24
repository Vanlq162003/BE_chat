import { string } from "joi";
import mongoose from "mongoose";

const messageModels = new mongoose.Schema(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        content: {type:  String , require : true},
        chat: { type: mongoose.Schema.Types.ObjectId, ref: "ChatRooms" },
        readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }]
    },
    {
        timestamps: true
    }
)
export default mongoose.model("Messages", messageModels)