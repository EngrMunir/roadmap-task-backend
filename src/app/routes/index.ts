import express from 'express';
import { UserRoutes } from '../../modules/User/user.route';
import { AuthRoutes } from '../../modules/Auth/auth.route';
import path from 'path';
import { RoadmapRoutes } from '../../modules/Roadmap/roadmap.route';

const router = express.Router();

const moduleRoutes =[
    {
        path:'/user',
        route: UserRoutes
    },
    {
        path:'/auth',
        route:AuthRoutes
    },
    {
        path:'/roadmap',
        route:RoadmapRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;