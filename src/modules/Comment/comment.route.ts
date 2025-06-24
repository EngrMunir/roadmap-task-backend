import express from 'express';
import { CommentController } from './comment.controller';
import auth from '../../app/middleware/auth';

const router = express.Router();

router.get("/:roadmapId", CommentController.getComments);

router.post("/", auth(),CommentController.createComment);
router.put("/:commentId",auth(), CommentController.updateComment);
router.delete("/:commentId",auth(), CommentController.deleteComment);

export const CommentRoutes = router;