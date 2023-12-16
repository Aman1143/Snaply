import express from 'express'
import { addComment, allLikes, cmtShow, createPost, deletePost, getAllposts, getMyposts, likeUnlike } from '../controllers/PostController.js';
const router=express.Router();
import { isAuthendicated } from '../middlewares/Auth.js';

router.post('/createPost',isAuthendicated,createPost);
router.get('/allpost',isAuthendicated,getAllposts);
router.get('/likeUnlike/:id',isAuthendicated,likeUnlike);
router.post('/addComment/:id',isAuthendicated,addComment);
router.get('/getOwnPost/:id',isAuthendicated,getMyposts);
router.get('/deletePost/:id',isAuthendicated,deletePost);
router.get('/allLikes/:id',isAuthendicated,allLikes);
router.get('/allCmts/:id',isAuthendicated,cmtShow);
export default router;