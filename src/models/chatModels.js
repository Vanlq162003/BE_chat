import mongoose from "mongoose";

const chatModels = new mongoose.Schema(
    {
        chatName: {type: String , require: true},
        isGroupChat: {type: Boolean },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Messages"
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }


    },
    {
        timestamps: true
    }
)
export default mongoose.model("ChatRooms" , chatModels)