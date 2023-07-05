import express from 'express'
import { addComment, createPost, deletePost, getAllposts, getMyposts, likeUnlike } from '../controllers/PostController.js';
const router=express.Router();
import { isAuthendicated } from '../middlewares/Auth.js';

router.post('/createPost',isAuthendicated,createPost);
router.get('/allpost',isAuthendicated,getAllposts);
router.get('/likeUnlike/:id',isAuthendicated,likeUnlike);
router.post('/addComment/:id',isAuthendicated,addComment);
router.get('/getOwnPost',isAuthendicated,getMyposts);
router.get('/deletePost/:id',isAuthendicated,deletePost);
export default router;