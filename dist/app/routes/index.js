"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../../modules/User/user.route");
const auth_route_1 = require("../../modules/Auth/auth.route");
const roadmap_route_1 = require("../../modules/Roadmap/roadmap.route");
const comment_route_1 = require("../../modules/Comment/comment.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/user',
        route: user_route_1.UserRoutes
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes
    },
    {
        path: '/roadmap',
        route: roadmap_route_1.RoadmapRoutes
    },
    {
        path: '/comment',
        route: comment_route_1.CommentRoutes
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
