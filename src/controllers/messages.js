import Messages from "../models/messagesModels";
import Users from "../models/usersModels";
import ChatRooms from "../models/chatModels";


export const allMessages = async (req, res) => {
    try {
        const messages = await Messages.find({ chat: req.params.chatId })
            .populate("sender", "name image email")
            .populate("chat");
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};


export const sendMessage = async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        var message = await Messages.create(newMessage);

        message = await message.populate("sender", "name image")
        message = await message.populate("chat")
        message = await Users.populate(message, {
            path: "chat.users",
            select: "name image email",
        });

        await ChatRooms.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};