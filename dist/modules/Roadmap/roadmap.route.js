"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoadmapRoutes = void 0;
const express_1 = __importDefault(require("express"));
const roadmap_controller_1 = require("./roadmap.controller");
const auth_1 = __importDefault(require("../../app/middleware/auth"));
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.get('/', roadmap_controller_1.RoadmapController.getAllRoadmap);
router.get('/:id', roadmap_controller_1.RoadmapController.getSingleRoadmap);
router.post('/', roadmap_controller_1.RoadmapController.createRoadmap);
router.patch('/upvote/:roadmapId', (0, auth_1.default)(user_constant_1.USER_ROLE.user), roadmap_controller_1.RoadmapController.upvoteRoadmapItem);
exports.RoadmapRoutes = router;
