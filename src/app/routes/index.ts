import express from 'express';
import { UserRoutes } from '../../modules/User/user.route';
import { AuthRoutes } from '../../modules/Auth/auth.route';
import { RoadmapRoutes } from '../../modules/Roadmap/roadmap.route';
import { CommentRoutes } from '../../modules/Comment/comment.route';

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
    },
    {
        path:'/comment',
        route:CommentRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;