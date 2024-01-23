import express from 'express'
const router=express.Router();
import { isAuthendicated } from '../middlewares/Auth.js';
import { addChat, getMesage } from '../controllers/MessageController.js';
import { getFriends, getUser } from '../controllers/AuthController.js';
import { chatUser, newChat } from '../controllers/ChatController.js';



// router.get('/',isAuthenticated,allUser);
// router.get('/all',isAuthenticated,getAllusers);
router.get('/sender/:id',isAuthendicated,getUser);
router.get('/friends/:id',isAuthendicated,getFriends);

// // chat route

router.post('/chats',isAuthendicated,newChat);
router.get('/chats/:userId',isAuthendicated,chatUser);
// router.get('/chat/find/:firstUserId/:secondUserId',isAuthenticated,bothUserChat);


// // message route
router.post('/message',isAuthendicated,addChat);
router.get('/message/:conversationId',isAuthendicated,getMesage);


export default router;