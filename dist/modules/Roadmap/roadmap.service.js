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
exports.RoadmapService = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../app/errors/AppError"));
const roadmap_model_1 = require("./roadmap.model");
const http_status_1 = __importDefault(require("http-status"));
const getAllRoadmap = (filters, sortBy, sortOrder) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (filters.status) {
        query.status = filters.status;
    }
    if (filters.category) {
        query.category = filters.category;
    }
    let sortQuery = {};
    if (sortBy) {
        const order = sortOrder === 'asc' ? 1 : -1;
        sortQuery[sortBy] = order;
    }
    else {
        sortQuery = { createdAt: -1 }; // Default sorting
    }
    const roadmaps = yield roadmap_model_1.Roadmap.find(query).sort(sortQuery).select('-upvotedBy');
    return roadmaps;
});
const getSingleRoadmap = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield roadmap_model_1.Roadmap.findById(id);
});
const createRoadmap = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield roadmap_model_1.Roadmap.create(payload);
});
const upvoteRoadmapItem = (roadmapId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const roadmap = yield roadmap_model_1.Roadmap.findById(roadmapId);
    if (!roadmap)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Roadmap item not found');
    const alreadyUpvoted = (_a = roadmap.upvotedBy) === null || _a === void 0 ? void 0 : _a.some(id => id.equals(userId));
    if (alreadyUpvoted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'You have already upvoted this item');
    }
    (_b = roadmap.upvotedBy) === null || _b === void 0 ? void 0 : _b.push(new mongoose_1.Types.ObjectId(userId));
    roadmap.upvotes = (roadmap.upvotes || 0) + 1;
    yield roadmap.save();
    return roadmap;
});
exports.RoadmapService = {
    getAllRoadmap,
    getSingleRoadmap,
    createRoadmap,
    upvoteRoadmapItem
};
