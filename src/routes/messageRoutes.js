import express from "express";
import protect from "../middlewares/authMiddleware";
import {  allMessages, sendMessage } from "../controllers/messages";

const router = express.Router();



router.get('/message/:chatId' ,protect , allMessages)
router.post('/message' ,protect , sendMessage)




export default router;