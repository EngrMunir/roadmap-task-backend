import express from 'express';
import { CommentController } from './comment.controller';

const router = express.Router();

router.get("/:roadmapId", CommentController.getComments);

router.post("/", CommentController.createComment);
router.put("/:commentId", CommentController.updateComment);
router.delete("/:commentId", CommentController.deleteComment);

export default router;