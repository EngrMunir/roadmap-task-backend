"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../app/errors/AppError"));
const comment_model_1 = require("./comment.model");
const http_status_1 = __importDefault(require("http-status"));
const createComment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { roadmapId, userId, content, parentCommentId } = data;
    let depth = 0;
    if (parentCommentId) {
        const parent = yield comment_model_1.Comment.findById(parentCommentId);
        if (!parent)
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Parent comment not found");
        depth = parent.depth + 1;
    }
    const comment = yield comment_model_1.Comment.create({
        roadmapId: new mongoose_1.Types.ObjectId(roadmapId),
        userId: new mongoose_1.Types.ObjectId(userId),
        content,
        parentCommentId: parentCommentId ? new mongoose_1.Types.ObjectId(parentCommentId) : null,
        depth,
    });
    return comment;
});
const getCommentsByRoadmap = (roadmapId) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield comment_model_1.Comment.find({ roadmapId })
        .populate("userId", "name email")
        .sort({ createdAt: 1 })
        .lean();
    const commentMap = {};
    const roots = [];
    comments.forEach(c => {
        c.replies = [];
        commentMap[c._id.toString()] = c;
    });
    comments.forEach(c => {
        if (c.parentCommentId) {
            const parent = commentMap[c.parentCommentId.toString()];
            if (parent)
                parent.replies.push(c);
        }
        else {
            roots.push(c);
        }
    });
    return roots;
});
const updateComment = (commentId, userId, content) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comment_model_1.Comment.findById(commentId);
    if (!comment)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Comment not found");
    if (comment.userId.toString() !== userId)
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Not authorized");
    comment.content = content;
    yield comment.save();
    return comment;
});
const deleteComment = (commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comment_model_1.Comment.findById(commentId);
    if (!comment)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Comment not found");
    if (comment.userId.toString() !== userId)
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Not authorized");
    yield comment.deleteOne();
    return { message: "Comment deleted successfully" };
});
exports.CommentService = {
    createComment,
    getCommentsByRoadmap,
    updateComment,
    deleteComment
};
