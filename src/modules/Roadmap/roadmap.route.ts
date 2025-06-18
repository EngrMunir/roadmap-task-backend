import express from 'express';
import { RoadmapController } from './roadmap.controller';

const router = express.Router();

router.get('/', RoadmapController.getAllRoadmap);
router.get('/:id', RoadmapController.getSingleRoadmap);

router.post('/',  RoadmapController.createRoadmap);

export const RoadmapRoutes = router;