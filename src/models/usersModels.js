import mongoose from "mongoose";

const userModels = new mongoose.Schema(
    {
        name: {type: String , require: true},
        email: {type: String , require: true , unique: true},
        password: {type: String , require: true},
        image: {
            type: String,
            required: true,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true
    }
)
export default mongoose.model("Users", userModels)