import express from "express";
import { Login, Register, allUser } from "../controllers/users";
import protect from "../middlewares/authMiddleware";

const router = express.Router();

router.post('/login' , Login)
router.post('/register' , Register)
router.get('/user', protect, allUser)


export default router;