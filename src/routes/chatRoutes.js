import express from "express";
import protect from "../middlewares/authMiddleware";
import { accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, renameGroup } from "../controllers/chats";

const router = express.Router();

router.post('/chat' , protect , accessChat)
router.get('/chat' , protect , fetchChats)
router.post('/chat/group' , protect, createGroupChat)
router.put('/chat/rename' , protect, renameGroup)
router.put('/chat/groupremove' , protect, removeFromGroup)
router.put('/chat/groupadd' , protect, addToGroup)


export default router;