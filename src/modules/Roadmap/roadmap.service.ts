import { TRoadmap } from "./roadmap.interface";
import { Roadmap } from "./roadmap.model";

const getAllRoadmap = async () => {
  const roadmaps = await Roadmap.find();
  return roadmaps;
};

const getSingleRoadmap = async (id: string) => {
  return await Roadmap.findById(id);
};

const createRoadmap = async (payload: TRoadmap) => {
  return await Roadmap.create(payload);
};

export const RoadmapService = {
  getAllRoadmap,
  getSingleRoadmap,
  createRoadmap,
};
