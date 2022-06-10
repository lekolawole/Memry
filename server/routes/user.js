import express from 'express';
import { signin, signup } from '../controllers/user.js'; //needs '.js' in Node.js

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);



export default router; 