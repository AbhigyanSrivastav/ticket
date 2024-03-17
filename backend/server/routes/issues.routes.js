import express from 'express';
import {createIssue,getAllIssues,getIssueById,updateIssue,deleteIssue} from '../controllers/issue.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/') // Assuming base route is '/api/issues'
    .post(authMiddleware, createIssue)
    .get(authMiddleware, getAllIssues); 

router.route('/:id')
    .get(authMiddleware, getIssueById)
    .put(authMiddleware, updateIssue)
    .delete(authMiddleware, deleteIssue);

export default router;
