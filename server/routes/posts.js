//All Post routes
// http://localhost:5000/posts

import express from 'express';
import { getPostsBySearch, getPosts, getPost, createPost, updatePost, deletePost, likePost, commentPost } from '../controllers/posts.js'; //needs '.js' in Node.js
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost); //used for updating existing posts 
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);


export default router; 