import express from 'express';
import {getNewsletterArchive, getNewsletterIssue} from '../controllers/mdx.controller.js';

const router = express.Router();
router.get('/archive', getNewsletterArchive);
router.get('/:slug', getNewsletterIssue);

// router.get('/', (req, res) => {
//   res.send('This is the API !');
// });
export default router;