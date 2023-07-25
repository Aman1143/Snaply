import express from 'express'
import { editProfile, followAndUnFollow, forgotPassword, getAllUser, getMe, login, logout, myProfile, register, resetPassword, searchPerson } from '../controllers/AuthController.js';
const router=express.Router();
import { isAuthendicated } from '../middlewares/Auth.js';
import path from 'path'; 

router.post('/register',register);
router.post('/login',login);
router.get('/me',isAuthendicated,getMe);
router.get('/allUser',getAllUser);
router.get('/followAndUnFollow/:id',isAuthendicated,followAndUnFollow);
router.get('/profile/:id',isAuthendicated,myProfile);
router.post('/editProfile',isAuthendicated,editProfile);
router.get('/userSearch',isAuthendicated,searchPerson);
router.get('/logout',isAuthendicated,logout);
router.post('/password/forgot',forgotPassword);
router.put('/password/reset/:token',resetPassword);

export default router;