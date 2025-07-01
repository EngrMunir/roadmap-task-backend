"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("./comment.controller");
const auth_1 = __importDefault(require("../../app/middleware/auth"));
const router = express_1.default.Router();
router.get("/:roadmapId", comment_controller_1.CommentController.getComments);
router.post("/", (0, auth_1.default)(), comment_controller_1.CommentController.createComment);
router.put("/:commentId", (0, auth_1.default)(), comment_controller_1.CommentController.updateComment);
router.delete("/:commentId", (0, auth_1.default)(), comment_controller_1.CommentController.deleteComment);
exports.CommentRoutes = router;
