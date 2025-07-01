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
exports.RoadmapController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../app/utils/catchAsync");
const roadmap_service_1 = require("./roadmap.service");
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const createRoadmap = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield roadmap_service_1.RoadmapService.createRoadmap(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Roadmap created successfully',
        data: result,
    });
}));
const getAllRoadmap = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = {
        status: req.query.status,
        category: req.query.category,
    };
    const sortBy = req.query.sortBy;
    const sortOrder = req.query.sortOrder;
    const result = yield roadmap_service_1.RoadmapService.getAllRoadmap(filters, sortBy, sortOrder);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Roadmap retrieved successfully',
        data: result,
    });
}));
const getSingleRoadmap = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield roadmap_service_1.RoadmapService.getSingleRoadmap(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single roadmap retrieved successfully',
        data: result,
    });
}));
const upvoteRoadmapItem = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { roadmapId } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id; // assuming you're using auth middleware
    const result = yield roadmap_service_1.RoadmapService.upvoteRoadmapItem(roadmapId, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Upvote successful',
        data: result,
    });
}));
exports.RoadmapController = {
    getAllRoadmap,
    getSingleRoadmap,
    createRoadmap,
    upvoteRoadmapItem
};
