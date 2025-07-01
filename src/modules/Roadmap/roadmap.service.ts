import { Types } from "mongoose";
import AppError from "../../app/errors/AppError";
import { TRoadmap } from "./roadmap.interface";
import { Roadmap } from "./roadmap.model";
import status from "http-status";

const getAllRoadmap = async (
  filters: { status?: string; category?: string },
  sortBy?: string,
  sortOrder?: string
) => {
  const query: any = {};

  if (filters.status) {
    query.status = filters.status;
  }
  if (filters.category) {
    query.category = filters.category;
  }

  let sortQuery: any = {};
  if (sortBy) {
    const order = sortOrder === 'asc' ? 1 : -1;
    sortQuery[sortBy] = order;
  } else {
    sortQuery = { createdAt: -1 }; // Default sorting
  }

  const roadmaps = await Roadmap.find(query).sort(sortQuery).select('-upvotedBy');
  return roadmaps;
};


const getSingleRoadmap = async (id: string) => {
  return await Roadmap.findById(id);
};

const createRoadmap = async (payload: TRoadmap) => {
  return await Roadmap.create(payload);
};

const upvoteRoadmapItem = async (roadmapId: string, userId: string) => {
  const roadmap = await Roadmap.findById(roadmapId);

  if (!roadmap) throw new AppError(status.NOT_FOUND, 'Roadmap item not found');

  const alreadyUpvoted = roadmap.upvotedBy?.some(id => id.equals(userId));
  if (alreadyUpvoted) {
    throw new AppError(status.BAD_REQUEST, 'You have already upvoted this item');
  }

  roadmap.upvotedBy?.push(new Types.ObjectId(userId));
  roadmap.upvotes = (roadmap.upvotes || 0) + 1;

  await roadmap.save();
  return roadmap;
};

export const RoadmapService = {
  getAllRoadmap,
  getSingleRoadmap,
  createRoadmap,
  upvoteRoadmapItem
};
