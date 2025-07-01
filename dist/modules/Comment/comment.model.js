"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    roadmapId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Roadmap", required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, maxlength: 300 },
    parentCommentId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Comment", default: null },
    depth: { type: Number, required: true, default: 0 },
}, {
    timestamps: true,
});
exports.Comment = (0, mongoose_1.model)("Comment", commentSchema);
