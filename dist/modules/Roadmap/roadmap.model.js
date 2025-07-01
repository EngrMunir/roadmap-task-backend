"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roadmap = void 0;
const mongoose_1 = require("mongoose");
const roadmapSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: String,
    category: String,
    status: {
        type: String,
        enum: ['Planned', 'In Progress', 'Completed'],
        default: 'Planned',
    },
    upvotes: { type: Number, default: 0 },
    upvotedBy: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true
});
exports.Roadmap = (0, mongoose_1.model)('Roadmap', roadmapSchema);
