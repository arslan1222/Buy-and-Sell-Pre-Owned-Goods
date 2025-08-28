import express from 'express';
import authUser from '../middelware/user.auth.js';
import upload from '../middelware/multer.js';
import { adminLogin, getAllUsers, getProfile, loginUser, registerUser, updateProfile } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);
userRouter.get('/all-users', getAllUsers);
userRouter.post('/admin', adminLogin);


export default userRouter;