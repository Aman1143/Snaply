import express from 'express'
import { editProfile, followAndUnFollow, forgotPassword, getAllUser, login, logout, myProfile, register, resetPassword, searchPerson } from '../controllers/AuthController.js';
const router=express.Router();
import { isAuthendicated } from '../middlewares/Auth.js';


router.post('/register',register);
router.post('/login',login);
router.get('/allUser',getAllUser);
router.get('/followAndUnFollow/:id',isAuthendicated,followAndUnFollow);
router.get('/profile',isAuthendicated,myProfile);
router.post('/editProfile',isAuthendicated,editProfile);
router.get('/userSearch',isAuthendicated,searchPerson);
router.get('/logout',isAuthendicated,logout);
router.post('/password/forgot',forgotPassword);
router.put('/password/reset/:token',resetPassword);

export default router;