import express from 'express';
import { RoadmapController } from './roadmap.controller';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.get('/', RoadmapController.getAllRoadmap);
router.get('/:id', RoadmapController.getSingleRoadmap);

router.post('/',  RoadmapController.createRoadmap);
router.patch('/upvote/:roadmapId', auth(USER_ROLE.user), RoadmapController.upvoteRoadmapItem);

export const RoadmapRoutes = router;